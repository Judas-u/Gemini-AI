
// node --version # Should be >= 18
// npm install @google/generative-ai
// npm install dotenv

 import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

import "dotenv/config";  

 const MODEL_NAME = "gemini-1.0-pro";
 const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

async function runChat(prompt) {
   const genAI = new GoogleGenerativeAI(API_KEY);
  
   const model = genAI.getGenerativeModel({ model: MODEL_NAME });

   const generationConfig = {
    temperature: 0.9,  
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  // Define safety settings to block harmful content
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

  // Start a new chat session with the defined configurations and empty history
  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [], // An empty array means a new conversation starts with each call
  });

  // Send the user's prompt and get the response
  const result = await chat.sendMessage(prompt);
  const response = result.response;
  
  // Log and return the generated text
  console.log(response.text());
  return response.text();
}

// Export the function so it can be used in other modules
export default runChat;