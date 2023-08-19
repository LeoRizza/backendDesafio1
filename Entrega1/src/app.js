import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';
import CartManager from './CartManager.js'; // Importa el CartManager

const PORT = 8080;
const app = express();
const cartManagerInstance = new CartManager();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); // Agrega el enrutador de carrito

app.listen(PORT, () => {
    console.log(`Servidor puerto: ${PORT}`);
});
