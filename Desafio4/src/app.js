import express from 'express';
import { fileURLToPath } from 'url';
import productRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';
import CartManager from './CartManager.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import ProductManager from './ProductManager.js';

const PORT = 8080;
const app = express();
const cartManagerInstance = new CartManager();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const productsFilePath = path.join(__dirname, '../products/products.json');
const productManagerInstance = new ProductManager(productsFilePath);

//socket.io
const server = app.listen(PORT, () => {
    console.log(`Servidor puerto: ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//server socket.io
const io = new Server(server);

io.on('connection', async (socket) => {
    console.log("Servidor Socket.io conectado");
    socket.on('mensajeConexion', (info) => {
        console.log(info);
    });
    socket.emit('realtimeProducts', await productManagerInstance.getProducts());
    socket.on('addProduct', async (newProduct) => {
        await productManagerInstance.addProduct(newProduct);
        io.emit('realtimeProducts', await productManagerInstance.getProducts());
    });

    socket.on('deleteProduct', async (productId) => {
        await productManagerInstance.deleteProduct(productId);
        io.emit('realtimeProducts', await productManagerInstance.getProducts());
    });
});

//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));


app.get('/static', async (req, res) => {
    const products = await productManagerInstance.getProducts();
    res.render('home', {
        css: "style.css",
        titulo: "Ecommerce backend",
        js: "script.js",
        productos: products 
    });
});

app.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts', {
        css: "style.css",
        titulo: "Productos en tiempo real",
    });
});