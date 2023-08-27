import express from 'express';
import { fileURLToPath } from 'url';
import productRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';
import CartManager from './CartManager.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io'
import path from 'path';

const PORT = 8080;
const app = express();
const cartManagerInstance = new CartManager();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//socket.io
const server = app.listen(PORT, () => {
    console.log(`Servidor puerto: ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//server socket.io
const io = new Server(server)

io.on ('connection', (socket) => {
    console.log("Servidor Socket.io conectado")
    socket.on('mensajeConexion', (info) => {
        console.log(info)
    })
})


//handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.get('/static', async (req,res) => {
    res.render('home', {
        css: "style.css",
        titulo: "Ecommerce backend",
    })
})
