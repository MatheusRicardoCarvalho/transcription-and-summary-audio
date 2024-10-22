import { Router } from "express"
import * as url from 'url'
import multer from 'multer'
import path from 'path';
import { handleAudioUpload } from '../controllers/audioController.js';
import { upload } from '../services/uploadService/uploadService.js'
import { validateAudioFile } from '../middlewares/validationMiddleware.js'
import { errorHandler } from "../middlewares/errorHandler.js";

const __dirname = url.fileURLToPath(new URL('../../', import.meta.url))

const routes = Router()

routes.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '../view/index.html'))
})

routes.post('/summary', upload.single('audio'), validateAudioFile, handleAudioUpload)

routes.use(errorHandler)

export default routes
