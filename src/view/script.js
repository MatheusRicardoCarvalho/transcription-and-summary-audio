document
  .getElementById("audioForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const audioFile = document.getElementById("audioFile").files[0];
    if (!audioFile) {
      alert("Por favor, selecione um arquivo de áudio.");
      return;
    }

    console.log("tipo do áudio: " + audioFile.type);

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      const response = await fetch("http://localhost:3000/summary", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao enviar o arquivo.");
      }

      const data = await response.json();

      // Exibir resumo e transcrição retornados pelo backend
      const summaryMarkdown = data.summary || "Resumo não disponível.";
      const summaryProcessingTime =
        data.summaryProcessingTime || "tempo de processamento não disponível.";
      const summaryTokens =
        data.summaryTokens || "consumo de tokens não disponível.";
      const summaryModel = data.summaryModel || "modelo não disponível.";

      const transcriptionMarkdown =
        data.transcription || "Transcrição não disponível.";

      // Converter Markdown para HTML
      document.getElementById("audioSummary").innerHTML =
        marked.parse(summaryMarkdown);
      document.getElementById(
        "audioSummary"
      ).innerHTML += `<p>Tempo de Processamento Total(prompt + resposta): ${summaryProcessingTime} Segundos</p>`;
      document.getElementById(
        "audioSummary"
      ).innerHTML += `<p>Consumo de Tokens Total(prompt + resposta): ${summaryTokens}</p>`;
      document.getElementById(
        "audioSummary"
      ).innerHTML += `<p>Modelo: ${summaryModel}</p>`;

      document.getElementById("audioTranscription").innerHTML = marked.parse(
        transcriptionMarkdown
      );
    } catch (error) {
      console.error("Erro:", error);
      alert(
        "Ocorreu um erro: " + error.message + " Por favor, tente novamente."
      );
    }
  });
