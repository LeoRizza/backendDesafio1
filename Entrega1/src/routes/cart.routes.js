import express from 'express';
import CartManager from '../CartManager.js'; // Importa el CartManager

const router = express.Router();
const cartManagerInstance = new CartManager(); // Crea una instancia de CartManager

router.get('/', (req, res) => {
    const cart = cartManagerInstance.getCart();
    res.status(200).json(cart);
});

router.post('/add', (req, res) => {
    const product = req.body;
    cartManagerInstance.addToCart(product);
    res.status(201).send('Producto agregado al carrito');
});

router.delete('/remove/:id', (req, res) => {
    const productId = req.params.id;
    cartManagerInstance.removeFromCart(productId);
    res.status(200).send('Producto eliminado del carrito');
});

export default router;
