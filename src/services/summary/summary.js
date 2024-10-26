import Groq from "groq-sdk";
import prompt from "./prompt.js";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function summary(content) {
  try{
    const chatCompletion = await getGroqChatCompletion(content);
    const response = chatCompletion.choices[0]?.message?.content || ""
    const summaryProcessingTime = chatCompletion.usage.total_time
    const summaryTokens = chatCompletion.usage.total_tokens
    const summaryModel = chatCompletion.model
    return {summaryResult: response, summaryProcessingTime, summaryTokens,summaryModel}
  } catch(err){
    throw err
  }
  
}

export async function getGroqChatCompletion(content) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt +content,
      },
    ],
    model: "llama3-70b-8192",
  });
}