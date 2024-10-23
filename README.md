# Projeto de transcrição e resumo

Este projeto é uma aplicação web que permite o upload de arquivos de áudio, realiza a transcrição e gera um resumo do conteúdo transcrito utilizando a API da Groq. O sistema foi desenvolvido utilizando Node.js e Express.

## Estrutura do Projeto

A estrutura do projeto é organizada em módulos, facilitando a manutenção e a escalabilidade. Abaixo estão os principais diretórios e suas funções:

### Principais Módulos

- **Controllers**: Gerenciam a lógica de controle das rotas, como o `audioController.js`, que lida com o upload de áudio e a chamada para os serviços de transcrição e resumo.
  
- **Middlewares**: Contêm funções que são executadas durante o ciclo de vida da requisição, como `validationMiddleware.js` para validar o tipo de arquivo enviado e `errorHandler.js` para tratar erros.

- **Services**: Implementam a lógica de negócios, como `transcribe.js` e `summary.js`, que interagem com a API da Groq para realizar a transcrição e o resumo do áudio.

- **Functions**: Contêm funções auxiliares que podem ser reutilizadas em diferentes partes do código.

## Dependências

O projeto utiliza as seguintes dependências:

- `express`: Framework web para Node.js.
- `groq-sdk`: SDK para interagir com a API da Groq.
- `multer`: Middleware para manipulação de uploads de arquivos.
- `axios`: Biblioteca para fazer requisições HTTP.

## Instalação

Para instalar e executar o projeto utilize o node 20.18 ou a última versão LTS, feito isso siga os passos abaixo:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/MatheusRicardoCarvalho/transcription-and-summary-audio.git
   cd transcription-and-summary-audio
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto e adicione sua chave da API da Groq:
   ```
   GROQ_API_KEY=seu_api_key_aqui
   ```

4. **Execute o projeto**:
   ```bash
   npm start
   ```

5. **Acesse a aplicação**:
   Abra seu navegador e vá para `http://localhost:3000`.

## Uso

1. Na interface do usuário, selecione um arquivo de áudio (.mp3 ou .wav) e clique em "Enviar".
2. O sistema processará o arquivo, realizará a transcrição e gerará um resumo.
3. O resumo e a transcrição serão exibidos na página.