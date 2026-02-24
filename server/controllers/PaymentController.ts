import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const { planName, price, priceId } = req.body;

        if (!planName || !price) {
            return res.status(400).json({ message: "Plan details are required" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: `Thumblify ${planName} Plan`,
                            description: `${planName} monthly subscription for Thumblify AI Thumbnail Generator`,
                        },
                        unit_amount: price * 100,   // Stripe uses paise (smallest unit)
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/#pricing`,
            locale: "auto",
        });

        res.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
        console.error("Stripe error:", error);
        res.status(500).json({ message: error.message });
    }
};
