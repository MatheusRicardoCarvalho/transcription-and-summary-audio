import { transcribe } from '../services/transcribe/transcribe.js';
import { summary } from '../services/summary/summary.js';
import { upload } from '../services/uploadService/uploadService.js';

export const audioController = async (req, res, next) => {
  try {
    const audioPath = req.file.path;

    const transcription = await transcribe(audioPath);
    const {summaryResult, summaryProcessingTime, summaryTokens, summaryModel} = await summary(transcription);

    res.status(200).json({
      transcription,
      summary: summaryResult,
      summaryProcessingTime,
      summaryTokens,
      summaryModel
    });
  } catch (error) {
    next(error)
  }
};

