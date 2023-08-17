import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // Importar fileURLToPath
import ProductManager from "./ProductManager.js";

const PORT = 8080;
const app = express();

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFilePath = path.join(__dirname, "../products/products.json");
const productManagerInstance = new ProductManager(productsFilePath);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("/products para ver productos");
});

app.get("/products", async (req, res) => {
    const products = await productManagerInstance.getProducts();
    const limit = Number(req.query.limit);
    
    if (limit) {
        if (!Number.isInteger(limit) || limit < 0) {
            return res.status(400).json({ message: "El parámetro limit debe ser un número entero positivo" });
        }
        return res.status(200).json(products.slice(0, limit));
    } else {
        return res.status(200).json(products);
    }
});

app.get("/products/:pid", async (req, res) => {
    const id = Number(req.params.pid);
    const product = await productManagerInstance.getProductById(id);

    if (!product) {
        return res.status(404).json(product);
    } else {
        res.status(200).json(product);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor puerto: ${PORT}`);
});
