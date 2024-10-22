import fs from "fs";
import Groq from "groq-sdk";

const groq = new Groq();

export async function transcribe(audioPath) {
  console.log('audio: \n'+audioPath)

  const transcription = await groq.audio.transcriptions.create({
    file: fs.createReadStream(audioPath),
    model: "whisper-large-v3-turbo",
    response_format: "verbose_json",
    language: "pt",
  });
  console.log(transcription);
  return transcription.text
}
