
import { GoogleGenAI } from "@google/genai";

// Fixed: Strictly following guidelines for GoogleGenAI initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateMasterDescription(profession: string, experience: string): Promise<string> {
  // Guard clause using the environment variable
  if (!process.env.API_KEY) return "Professional usta xizmatlari.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `O'zbek tilida usta uchun professional va jozibali tavsif yozib bering. Kasbi: ${profession}, Tajribasi: ${experience}. Maksimal 3 ta qisqa gap.`,
    });
    // response.text is a getter, correct usage
    return response.text || "Professional usta xizmatlari.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tajribali usta o'z xizmatlarini taklif etadi.";
  }
}
