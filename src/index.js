import express from 'express'
import { Readable, Transform } from 'stream'
import path from 'path'
import routes from './routes/routes.js'
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(process.cwd(), 'src/view')));

app.use(express.json());

app.use(routes)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function handler(request, response){
    const readable = new Readable({
        read(){

            //this.push(AUDIO)

            this.push(null)
        }
    })

    readable.pipe(response)
}
