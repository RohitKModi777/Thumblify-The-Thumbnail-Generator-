import { Request, Response } from "express"
import User from "../models/User.js";
import bcrypt from "bcrypt"
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }

        //encrypted the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save()

        //setting User data in session
        req.session.isLoggedIn = true;
        req.session.userId = newUser._id;

        return res.json({
            message: 'Account created successfully',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })

    }
    catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

// Controller for user login

export const loginUser = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;
        //   find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Email or Password' })
        }

        //compare the password
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Password" })
        }


        //setting User data in session
        req.session.isLoggedIn = true;
        req.session.userId = user._id;

        return res.json({
            message: 'Login successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    }
    catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

// controller For User Logout 
export const logoutUser = async (req: Request, res: Response) => {

    req.session.destroy((error: any) => {
        if (error) {
            console.log(error)
            return res.status(500).json({ mesage: error.message })
        }
    })
    return res.json({ message: "Logout successfull" })
}


// controller for user verify
export const verifyUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const user = await User.findById(userId).select('-password')

        if (!user) {
            return res.status(400).json({ message: "Invalid User" })
        }
        return res.json({ user })
    }
    catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message })

    }
}

// Google OAuth controller
export const googleAuth = async (req: Request, res: Response) => {
    try {
        const { credential } = req.body;
        if (!credential) {
            return res.status(400).json({ message: "No Google credential provided" });
        }

        // Verify the Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).json({ message: "Invalid Google token" });
        }

        const { sub: googleId, email, name, picture } = payload;

        if (!email || !name) {
            return res.status(400).json({ message: "Google account missing required info" });
        }

        // Find existing user or create new one
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user (no password for Google accounts)
            user = await User.create({
                name,
                email,
                googleId,
                avatar: picture,
                password: undefined,
            });
        } else if (!user.googleId) {
            // Link Google account to existing email account
            user.googleId = googleId;
            user.avatar = picture;
            await user.save();
        }

        // Set session
        req.session.isLoggedIn = true;
        req.session.userId = (user as any)._id;

        return res.json({
            message: "Logged in with Google successfully",
            user: {
                _id: (user as any)._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
