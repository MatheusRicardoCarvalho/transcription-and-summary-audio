export const validateAudioFile = (req, res, next) => {
  const validTypes = ['audio/mp3', 'audio/wav', 'audio/m4a', 'audio/flac', 'audio/ogg', 'audio/webm'];
  
  if (!req.file || !validTypes.includes(req.file.mimetype)) {
    return res.status(400).json({ error: 'Tipo de arquivo inválido. Por favor, envie um arquivo de áudio suportado.' });
  }
  
  next();
};
