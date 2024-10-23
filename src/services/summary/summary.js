import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function summary(content) {
  try{
    const chatCompletion = await getGroqChatCompletion(content);
    const response = chatCompletion.choices[0]?.message?.content || ""
    const processingTime = chatCompletion.usage.total_time
    console.log(response);
    return response
  } catch(err){
    throw err
  }
  
}

export async function getGroqChatCompletion(content) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: 'Resuma o conteúdo do seguinte texto: '+ content,
      },
    ],
    model: "llama3-8b-8192",
  });
}