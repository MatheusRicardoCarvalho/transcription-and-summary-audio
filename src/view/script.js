document.getElementById('audioForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const audioFile = document.getElementById('audioFile').files[0];
    if (!audioFile) {
      alert('Por favor, selecione um arquivo de áudio.');
      return;
    }

    console.log('tipo do áudio: '+audioFile.type)
    
    const formData = new FormData();
    formData.append('audio', audioFile);
    
    try {
      const response = await fetch('http://localhost:3000/summary', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao enviar o arquivo.');
      }
  
      const data = await response.json();
  
      document.getElementById('audioSummary').textContent = data.summary || 'Resumo não disponível.';
      document.getElementById('audioTranscription').textContent = data.transcription || 'Transcrição não disponível.';
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro: ' + error.message + ' Por favor, tente novamente.');
    }
  });