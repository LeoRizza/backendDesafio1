import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path'; 
import ProductManager from '../ProductManager.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFilePath = path.join(__dirname, '../../products/products.json');
const productManagerInstance = new ProductManager(productsFilePath);

router.get('/', async (req, res) => {
    const products = await productManagerInstance.getProducts();
    const limit = Number(req.query.limit);

    if (!isNaN(limit) && Number.isInteger(limit) && limit > 0) {
        return res.status(200).json(products.slice(0, limit));
    } else {
        return res.status(200).json(products);
    }
});

router.get('/:pid', async (req, res) => {
    const id = Number(req.params.pid);
    const product = await productManagerInstance.getProductById(id);

    if ("message" in product) {
        return res.status(404).json(product);
    } else {
        res.status(200).json(product);
    }
});

router.post('/', async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    
    if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
        return res.status(400).send('Faltan campos obligatorios');
    }
    
    const newProduct = {
        title,
        description,
        price: parseFloat(price),
        thumbnail,
        code,
        stock: parseInt(stock),
    };
    
    try {
        await productManagerInstance.addProduct(newProduct);
        res.status(201).send('Producto agregado correctamente');
    } catch (error) {
        res.status(500).send('Error al agregar el producto');
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    
    const result = await productManagerInstance.updateProduct(parseInt(id), updatedProduct);

    if (result === "not_found") {
        res.status(404).send("Producto no encontrado");
    } else {
        res.status(200).send(`Producto ${updatedProduct.title} actualizado`);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const result = await productManagerInstance.deleteProduct(parseInt(id));
    
    if (result === "not_found") {
        res.status(404).send("Producto no encontrado");
    } else {
        res.status(200).send(`Producto eliminado`);
    }
});

export default router;
