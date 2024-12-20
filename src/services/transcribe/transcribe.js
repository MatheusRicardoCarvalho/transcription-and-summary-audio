import fs from "fs";
import Groq from "groq-sdk";

const groq = new Groq();

export async function transcribe(audioPath) {

  try{
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-large-v3-turbo",
      response_format: "json",
      language: "pt",
    });
    return transcription.text
  } catch(err) {
    throw err
  }
  
}