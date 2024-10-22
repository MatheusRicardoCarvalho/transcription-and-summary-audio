import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function summary(content) {
  const chatCompletion = await getGroqChatCompletion(content);
  const response = chatCompletion.choices[0]?.message?.content || ""
  console.log(response);
  return response
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