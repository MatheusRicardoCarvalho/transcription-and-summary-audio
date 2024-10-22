import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = file.mimetype.replace("audio/", '.')
    console.log(ext)
    const extension = path.extname(file.originalname) || '.mp3';
    const newFilename = `${Date.now()}${extension}`;
    cb(null, newFilename);
  }
});

export const upload = multer({ storage });

