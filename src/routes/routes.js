import { Router } from "express"
import * as url from 'url'
import multer from 'multer'
import path from 'path';
import { transcribe } from '../functions/transcribe/transcribe.js'
import { summary } from '../functions/summary/summary.js'

const __dirname = url.fileURLToPath(new URL('../../', import.meta.url))

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname) || '.mp3'; // Use a extensão original, ou .mp3 como fallback
    const newFilename = `${Date.now()}${extension}`;
    cb(null, newFilename);
  }
});

const upload = multer({ storage });

const routes = Router()

routes.get('/', (request, response) => {
  response.sendFile(__dirname+'src/view/index.html')
})

routes.post('/summary', upload.single('audio'), async (request, response) => {
  try {
    const audioPath = request.file.path;

    const validTypes = ['audio/mp3', 'audio/wav', 'audio/m4a', 'audio/flac', 'audio/ogg', 'audio/webm'];
    if (!validTypes.includes(request.file.mimetype)) {
      return response.status(400).json({ error: 'Tipo de arquivo inválido. Por favor, envie um arquivo de áudio suportado.' });
    }

    const transcription = await transcribe(audioPath);
    const summaryResult = await summary(transcription);

    response.status(200).json({
      transcription: transcription,
      summary: summaryResult
    });
  } catch (error) {
    console.error('Erro:', error);
    response.status(500).json({ error: 'Ocorreu um erro ao processar o áudio.' });
  }
})

export default routes
