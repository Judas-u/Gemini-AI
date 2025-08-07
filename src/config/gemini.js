import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash";

if (!API_KEY) {
	console.error("VITE_GEMINI_API_KEY is not defined in environment variables");
	throw new Error("API key is required. Please set VITE_GEMINI_API_KEY in your environment variables.");
}

async function runChat(prompt) {
    try {
      if (!prompt || typeof prompt !== "string") {
        throw new Error("Prompt is required and must be a string");
      }

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });

      const result = await chat.sendMessage(prompt);
      const response = result.response;
      const responseText = response.text();
      return responseText;

    } catch (error) {
      console.error("Error in runChat:", error);

      if (error.message?.includes("API key not valid")) {
        throw new Error("Invalid API key. Please check your VITE_GEMINI_API_KEY environment variable.");
      } else if (error.message?.includes("quota")) {
        throw new Error("API quota exceeded. Please check your Google Cloud billing and quotas.");
      } else if (error.message?.includes("blocked")) {
        throw new Error("Content was blocked by safety filters. Try rephrasing your prompt.");
      } else {
        throw new Error(`Gemini API Error: ${error.message || "Unknown error occurred"}`);
      }
    }
  }

  async function startChatSession() {
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });

      return chat;

    } catch (error) {
      console.error("Error starting chat session:", error);
      throw error;
    }
}

export default runChat;
export { startChatSession };
