import express from "express";
import ProductManager from "./ProductManager.js";

const PORT = 8080;
const app = express();
const path = "./products/products.json";
const productManagerInstance = new ProductManager(path);

app.use(express.json());
app.use(express.static(path));

app.get("/products", async (req, res) => {
const products = await productManagerInstance.getProducts();
const limit = Number(req.query.limit);
if (limit) {
if (!Number.isInteger(limit) || limit < 0) {
return res.status(400).json({ message: "El parámetro limit debe ser un número entero positivo" });
}
return res.status(200).json(products.slice(0, limit));
} else
return res.status(200).json(products);
})

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
console.log(`Servidor puerto: ${PORT}`)
})