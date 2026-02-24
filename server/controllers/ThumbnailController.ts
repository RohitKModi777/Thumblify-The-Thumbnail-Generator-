import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import Thumbnail from "../models/Thumbnail.js";
import { GenerateContentConfig, HarmBlockThreshold, HarmCategory } from "@google/genai";
import ai from "../config/ai.js";
import { v2 as cloudinary } from "cloudinary";

/* STYLE PROMPTS*/

const stylePrompts = {
  "Bold & Graphic": "eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional style",

  "Tech/Futuristic": "futuristic thumbnail, sleek modern design,digital UI elements, glowing accents, holographic effects, cyber-tech aesthetic, sharp-lighting, high-tech atmosphere",

  'Minimalist': "minimalist thumbnail, clean layout,simple shapes,limited color palette, plenty of negative spaces, modern flat design,  clear focal point",

  "Photorealistic" : "photorealistic thumbnail, ultra-realistic lighting, natural skin tones,candid movement, DSLR style, photography,lifestyle realism, shallow depth of field",

  "Illustrated":"illustrated thumbnail, custom digital illustration, stylized characters, bold outlines, vibrant colors, creative cartoon or vector art style",
};

/* ---------------- COLOR SCHEMES ---------------- */

const colorSchemeDescriptions = {
  vibrant: "vibrant and energetic colors,high saturation, bold contrasts, eye-catching palette",
  sunset: "warm sunset tones,orange pink and purple hues, soft gradient, cinematic glow",
  forest: "natural green tones, earthy colors, calm and organic palette, fresh atmosphere",
  neon: "neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast glow",
  purple: "purple dominant color palette, magenta and violet tones, mmodern and stylish mood",
  monochrome: "black and white color scheme, high contrast, dramatic lighting, timeless aesthetic",
  ocean: "cool blue and teal tones, aquatic color palette, fresh and clean atmosphere",
  pastel: "soft pastel colors, low saturation, gentle tones, calm and friendly aesthetic",
};

/* =======================================================
                GENERATE THUMBNAIL
======================================================= */

export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session as any;
    const { title, prompt: user_prompt, style, aspect_ratio, color_scheme, text_overlay } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Create DB entry first
    const thumbnail = await Thumbnail.create({
      userId,
      title,
      prompt_used: user_prompt,
      user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
      isGenerating: true,
    });

    const model = "gemini-3-pro-image-preview"

    /*  GEMINI IMAGE GENERATION  */
    const generationConfig: GenerateContentConfig = {
      maxOutputTokens:32768,
      temperature: 1,
      topP: 0.95,
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: {
        aspectRatio: aspect_ratio || "16:9",
        imageSize:'1K'
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.OFF },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.OFF },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.OFF },
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.OFF },
      ],
    };

    /*PROMPT BUILDING*/

    let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts] ||
      stylePrompts["Bold & Graphic"]
      } for: ${title}. `;

    if (color_scheme) {
      prompt += `Use ${colorSchemeDescriptions[
        color_scheme as keyof typeof colorSchemeDescriptions
      ]
        }. `;
    }

    if (user_prompt) {
      prompt += `Additional details: ${user_prompt}. `;
    }

    prompt += `Thumbnail should be ${aspect_ratio || "16:9"}, visually stunning, bold, professional, and impossible to ignore`;



    const response: any = await ai.models.generateContent({
      model,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: generationConfig,
    });

    const parts = response?.candidates?.[0]?.content?.parts;

    if (!parts) {
      throw new Error("Invalid Gemini response");
    }

    let imageBuffer: Buffer | null = null;

    for (const part of parts) {
      if (part.inlineData?.data) {
        imageBuffer = Buffer.from(part.inlineData.data, "base64");
      }
    }

    if (!imageBuffer) {
      throw new Error("No image returned from Gemini");
    }

    /*SAVE TEMP FILE */

    const imagesDir = path.join(process.cwd(), "images");
    fs.mkdirSync(imagesDir, { recursive: true });

    const filename = `thumbnail-${Date.now()}.png`;
    const filePath = path.join(imagesDir, filename);

    fs.writeFileSync(filePath, imageBuffer);

    /* CLOUDINARY UPLOAD  */

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });

    /*  UPDATE DB */

    thumbnail.image_url = uploadResult.secure_url;
    thumbnail.isGenerating = false;
    await thumbnail.save();

    /* ---------------- CLEANUP ---------------- */
    res.json({
      message: "Thumbnail generated successfully",
      thumbnail,
    });
    fs.unlinkSync(filePath);
  } 

  catch (error: any) {
    console.error("Gemini Error:", error?.message);

    if (error?.status === 429) {
      return res.status(429).json({
        message: "AI generation limit reached. Try again later.",
      });
    }

    if (error?.message?.includes("API key")) {
      return res.status(400).json({
        message: "Invalid or expired Gemini API key.",
      });
    }

    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

/* DELETE THUMBNAIL*/

export const deleteThumbnail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.session as any;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Thumbnail.findOneAndDelete({ _id: id, userId });

    res.json({ message: "Thumbnail deleted successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const getThumbnail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.session;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const thumbnail = await Thumbnail.findOne({ _id: id, userId });

    if (!thumbnail) {
      return res.status(404).json({ message: "Thumbnail not found" });
    }

    res.json({ thumbnail });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};