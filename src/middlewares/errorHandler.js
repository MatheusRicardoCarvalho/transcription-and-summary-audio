import { GroqError } from "groq-sdk";

export const errorHandler = (err, req, res, next) => {
  console.log('Erro mano:\n' +JSON.stringify(err));
  res.status(err.status).json({ error: handleGroqError(err) });
};

function handleGroqError(error) {
    if (error.status) {
        const { status } = error;
        const message = error.error?.error?.message
        console.log("Error object:", JSON.stringify(error, null, 2));

        console.log("status do erro: "+status+"\nMessage: "+ message)
    
        const statusMessages = {
          400: "Bad Request",
          401: "Unauthorized",
          404: "Not Found",
          422: "Unprocessable Entity",
          429: "Too Many Requests",
          500: "Internal Server Error",
          502: "Bad Gateway",
          503: "Service Unavailable"
        };
    
        const errorMessage = statusMessages[status] 
          ? `${status} ${statusMessages[status]}: ${message}` 
          : `Unknown Error (${status}): ${message}`;

          return errorMessage
        
      }
  
    return `Network or other error: ${error}`
  }
  