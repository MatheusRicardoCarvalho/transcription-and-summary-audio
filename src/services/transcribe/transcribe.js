import fs from "fs";
import Groq from "groq-sdk";

const groq = new Groq();

export async function transcribe(audioPath) {

  try{
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-large-v3-turbo",
      response_format: "verbose_json",
      language: "pt",
    });
    console.log(transcription);
    return transcription.text
  } catch(err) {
    throw err
  }
  
}

function handleGroqError(error) {
  if (error.status) {
    const { status, message } = error;
    console.log("status do erro: "+status+"\nData: "+data)

    const statusMessages = {
      400: "Bad Request",
      401: "Unauthorized",
      404: "Not Found",
      422: "Unprocessable Entity",
      429: "Too Many Requests",
      500: "Internal Server Error",
      502: "Bad Gateway",
      503: "Service Unavailable"
    };

    const errorMessage = statusMessages[status] 
      ? `${status} ${statusMessages[status]}: ${message}` 
      : `Unknown Error (${status}): ${message}`;
    
    throw new Error(errorMessage);
  }

  throw new Error(`Network or other error vai: ${error}`);
}
