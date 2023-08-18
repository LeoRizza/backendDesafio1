import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/products.routes.js'; // Importa el enrutador de productos

const PORT = 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Usa el enrutador de productos en la ruta /products
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor puerto: ${PORT}`);
});
