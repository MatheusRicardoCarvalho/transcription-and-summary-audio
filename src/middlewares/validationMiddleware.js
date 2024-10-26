export const validateAudioFile = (req, res, next) => {
  const validTypes = ['audio/mp3', 'audio/wav', 'audio/mpeg','audio/x-m4a', 'audio/m4a'];
  
  if (!req.file || !validTypes.includes(req.file.mimetype)) {
    return res.status(400).json({ error: 'Tipo de arquivo inválido. Por favor, envie um arquivo de áudio suportado pelo sistema(mp3, wav, m4a).' });
  }
  
  next();
};
