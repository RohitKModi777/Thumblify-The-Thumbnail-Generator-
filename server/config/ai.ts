import { GoogleGenAI } from "@google/genai";
import { deflate } from "node:zlib";

const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY as string
})


export default ai