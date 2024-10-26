import Groq from "groq-sdk";
import prompt from "./prompt.js";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function summary(content) {
  try{
    const chatCompletion = await getGroqChatCompletion(content);
    const response = chatCompletion.choices[0]?.message?.content || ""
    const processingTime = chatCompletion.usage.total_time
    const tokens = chatCompletion.usage.total_tokens
    console.log(response);
    return {summaryResult: response, processingTime, tokens}
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