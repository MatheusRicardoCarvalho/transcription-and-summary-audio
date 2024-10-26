import { transcribe } from '../services/transcribe/transcribe.js';
import { summary } from '../services/summary/summary.js';
import { upload } from '../services/uploadService/uploadService.js';

export const handleAudioUpload = async (req, res, next) => {
  try {
    const audioPath = req.file.path;

    const transcription = await transcribe(audioPath);
    const {summaryResult, processingTime, tokens} = await summary(transcription);

    res.status(200).json({
      transcription,
      summary: summaryResult,
      processingTime,
      tokens
    });
  } catch (error) {
    next(error)
  }
};

