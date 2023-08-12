import { promises as fs } from 'fs'

class ProductManager {
constructor(path) {
this.path = path;
this.products = [];
this.id = 11;
}

async addProduct(product) {
    const products = await fs.promises.readFile(this.path, "utf-8");

    const nextId = products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
    product.id = nextId;
    if (product.stock < 0) {
        console.log("El stock no puede ser negativo");
        return;
    }

    products.push(product);
    await fs.promises.writeFile(this.path, JSON.stringify(products), "utf-8");
}

async getProducts() {
    const products = await fs.promises.readFile(this.path, "utf-8");
    const productsParsed = JSON.parse(products);
    return productsParsed;
}

async getProductById(id) {
    const products = await fs.promises.readFile(this.path, "utf-8");
    const product = products.find(product => product.id === id);

    if (product) {
        return product;
    } else {
        return { message: "Product Not Found" };
    }
};

updateProduct = async (id, updatedProduct) => {
    const products = await fs.promises.readFile(this.path, "utf-8");
    const index = products.findIndex(prod => prod.id === id);

    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        await fs.promises.writeFile(this.path, JSON.stringify(products), "utf-8");
    } else {
        console.log("Producto no encontrado");
    }
};

async addProduct(product) {
    const products = await fs.promises.readFile(this.path, "utf-8");
    const nextId = products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
    product.id = nextId;
    if (product.stock < 0) {
        console.log("El stock no puede ser negativo");
        return;
    }

    products.push(product);
    await fs.promises.writeFile(this.path, JSON.stringify(products), "utf-8");
}
}

export default ProductManager;