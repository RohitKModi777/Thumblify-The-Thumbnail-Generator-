import { Request, Response } from "express"
import path from "path";
import fs from "fs";
import Thumbnail from "../models/Thumbnail.js";
import { GenerateContentConfig, HarmBlockThreshold, HarmCategory } from "@google/genai";
import ai from "../config/ai.js";
import { v2 as cloudinary } from "cloudinary";


const stylePrompts = {
    'Bold & Graphic': 'eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional style, striking visuals',
    'Tech/Futuristic': 'futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects, sci-fi aesthetic, tech-inspired composition, cyberpunk vibes',
    'Minimalist': 'clean simple design, lots of white space, minimal color palette, elegant typography, uncluttered layout, focused subject, modern aesthetic, negative space usage',
    'Photorealistic': 'ultra-realistic image, natural lighting, lifelike details, high quality photography, authentic textures, detailed shadows, cinematic lighting, professional photo quality',
    'Illustrated': 'hand-drawn artwork, artistic style, creative illustration, colorful animated art, cartoon aesthetic, custom artwork, artistic composition, unique illustration style'
}


const colorSchemeDescriptions = {
    vibrant: 'bright, energetic colors with high saturation, vibrant palette featuring bold reds, teals, and blues, eye-catching and lively aesthetic',
    sunset: 'warm tones with orange, red, and pink hues, warm glowing aesthetic, romantic and energetic vibes, golden hour feeling',
    ocean: 'cool blue palette with aquatic tones, calming blue gradient, water-inspired theme, peaceful and professional ambiance',
    forest: 'natural green tones ranging from dark to light, earthy and organic palette, nature-inspired colors, environmental and fresh aesthetic',
    purple: 'purple gradient with lavender and violet shades, mystical and creative vibes, dreamy color scheme, elegant and artistic palette',
    monochrome: 'grayscale palette with blacks, grays, and whites, minimalist and sophisticated aesthetic, high contrast and professional appearance',
    neon: 'bright neon colors with magenta, cyan, and yellow, futuristic and electric aesthetic, high energy and vibrant vibes, cyberpunk inspired palette',
    pastel: 'soft, light, muted colors with gentle tones, calm and delicate aesthetic, feminine and friendly vibes, soothing color palette'
}

export const generateThumbnail = async (req: Request, res: Response) => {

    try {
        const { userId } = req.session;
        const { title, prompt: user_prompt, style, aspect_ratio, color_scheme, text_overlay } = req.body;

        const thumbnail = await Thumbnail.create({
            userId,
            title,
            prompt_used: user_prompt,
            user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
            isGenerating: true
        })

        const model = 'gemini-2-pro-image-preview';

        const generationConfig: GenerateContentConfig = {
            maxOutputTokens: 32768,
            temperature: 1,
            topP: 0.95,
            responseModalities: ['IMAGE'],
            imageConfig: {
                aspectRatio: aspect_ratio || '16:9',
                imageSize: '1K'
            },
            safetySettings: [
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.OFF },

                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.OFF },

                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.OFF },

                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.OFF },

            ]
        }

        let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for:${title}`

        if (color_scheme) {
            prompt += `Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme.`
        }

        if (user_prompt) {
            prompt += `Addidtional details: ${user_prompt}`
        }

        prompt += `Thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximize click-through rate. Make it bold, professional, and impossible to ignore.`

        // Generate the image using the ai model
        const response: any = await ai.models.generateContent({
            model,
            contents: [prompt],
            config: generationConfig
        })

        //  check if the resonse is valid
        if (!response?.candidates[0]?.content?.parts) {
            throw new Error('Unexpected response')
        }

        const parts = response.candidates[0].content.parts;

        let finalBuffer: Buffer | null = null;

        for (const part of parts) {
            if (part.inlineData) {
                finalBuffer = Buffer.from(part.inlineData.data, 'base64')
            }
        }

        const filename = `final-output-${Date.now()}.png`
        const filePath = path.join('images', filename);

        // create the image directory  if it doesn't exist
        fs.mkdirSync('images', { recursive: true });

        fs.writeFileSync(filePath, finalBuffer!)

        const uploadResult = await cloudinary.uploader.upload(filePath, { resource_type: "image" })

        thumbnail.image_url = uploadResult.url;
        thumbnail.isGenerating = false;
        await thumbnail.save()

        res.json({ message: "THUmbnail Generated", thumbnail })

        // remove image file from disk
        fs.unlinkSync(filePath)
    }
    catch (error: any) {
        console.log("Current API Key:", process.env.GEMINI_API_KEY?.substring(0, 5) + "...");
        console.log(error)
        if (error.message?.includes('RESOURCE_EXHAUSTED') || error.status === 429) {
            return res.status(429).json({ message: "AI Generation limit reached. Please try again in a minute." })
        }
        if (error.message?.includes('API key') || error.message?.includes('INVALID_ARGUMENT')) {
            return res.status(400).json({ message: "Invalid or expired API Key. Please check your .env file." })
        }
        res.status(500).json({ message: error.message || "Internal Server Error" })
    }
}


export const deleteThumbnail = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const { userId } = req.session;

        await Thumbnail.findByIdAndDelete({ _id: id, userId })

        res.json({ message: 'Thumbnail deleted successfully' })
    }
    catch (error: any) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
