import express from 'express'
import path from 'path'
import routes from './routes/routes.js'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(process.cwd(), 'src/view')));

app.use(express.json());

app.use(routes)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});