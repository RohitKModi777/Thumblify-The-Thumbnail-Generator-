
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

// Load .env from current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

console.log("Starting check_models.ts...");

if (!process.env.GEMINI_API_KEY) {
    console.error("No API key found in process.env!");
} else {
    console.log("API Key loaded (length " + process.env.GEMINI_API_KEY.length + ")");
}

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY as string
});

async function listModels() {
    try {
        console.log("Fetching models...");
        const response: any = await ai.models.list();

        let models = [];
        if (response.models) {
            models = response.models;
        } else if (Array.isArray(response)) {
            models = response;
        }

        console.log(`Found ${models.length} models.`);

        console.log("--- Image Generation Candidates ---");
        const imageModels = models.filter((m: any) =>
            m.name.includes('image') ||
            m.name.includes('imagen') ||
            (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateImages'))
        );
        imageModels.forEach((m: any) => {
            console.log(`Name: ${m.name}`);
            console.log(`Methods: ${m.supportedGenerationMethods ? m.supportedGenerationMethods.join(', ') : 'N/A'}`);
            console.log('---');
        });

        console.log("\n--- Gemini Models (First 10) ---");
        const geminiModels = models.filter((m: any) => m.name.includes('gemini')).slice(0, 10);
        geminiModels.forEach((m: any) => {
            console.log(`Name: ${m.name}`);
            console.log(`Methods: ${m.supportedGenerationMethods ? m.supportedGenerationMethods.join(', ') : 'N/A'}`);
        });

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
