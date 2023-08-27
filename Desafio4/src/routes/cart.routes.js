import express from 'express';
import CartManager from '../CartManager.js';

const router = express.Router();
const cartManagerInstance = new CartManager();

router.post('/', (req, res) => {
    const newCart = cartManagerInstance.createCart();
    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = cartManagerInstance.getCartById(cartId);

    if (cart) {
        res.status(200).json(cart);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const { quantity } = req.body;

    if (!Number.isInteger(quantity) || quantity < 1) {
        res.status(400).send('La cantidad debe ser un número entero positivo');
        return;
    }

    const success = cartManagerInstance.addProductToCart(cartId, productId, quantity);
    if (success) {
        res.status(200).send('Producto agregado al carrito');
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

export default router;
