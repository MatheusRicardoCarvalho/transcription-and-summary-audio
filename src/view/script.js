document.getElementById('audioForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const audioFile = document.getElementById('audioFile').files[0];
    if (!audioFile) {
      alert('Por favor, selecione um arquivo de áudio.');
      return;
    }

    console.log('tipo do áudio: '+audioFile.type)
    const validTypes = ['audio/mp3', 'audio/wav', 'audio/mpeg','audio/m4a', 'audio/flac', 'audio/ogg', 'audio/webm'];
    if (!validTypes.includes(audioFile.type)) {
      alert('Tipo de arquivo inválido. Por favor, envie um arquivo de áudio (.mp3, .wav, .m4a, .flac, .ogg, .webm).');
      return;
    }
  
    // Modificar a extensão do arquivo se necessário
    let newFile;
    if (audioFile.type === 'audio/mpeg') {
        const newFileName = audioFile.name.replace(/\.[^/.]+$/, "") + '.mp3'; // Troca a extensão para .mp3
        newFile = new File([audioFile], newFileName, { type: 'audio/mp3' });
    } else {
        newFile = audioFile; // Mantém o arquivo original se a extensão estiver correta
    }
  
    const formData = new FormData();
    formData.append('audio', newFile);
  
    try {
      const response = await fetch('http://localhost:3000/summary', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Erro ao enviar o arquivo.');
      }
  
      const data = await response.json();
  
      // Exibir resumo e transcrição retornados pelo backend
      document.getElementById('audioSummary').textContent = data.summary || 'Resumo não disponível.';
      document.getElementById('audioTranscription').textContent = data.transcription || 'Transcrição não disponível.';
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro: '+error.status+' ao enviar o arquivo. Por favor, tente novamente.');
    }
  });
  