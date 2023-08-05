import { promises as fs } from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getNextId() {
        const prods = await this.readProducts();
        return prods.length > 0 ? Math.max(...prods.map(product => product.id)) + 1 : 1;
    }

    async readProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async writeProducts(products) {
        await fs.writeFile(this.path, JSON.stringify(products));
    }

    async getProducts() {
        const prods = await this.readProducts();
        console.log(prods);
    }

    async getProductByCode(code) {
        const prods = await this.readProducts();
        const product = prods.find(prod => prod.code === code);

        if (product)
            console.log(product);
        else
            console.log("Producto no encontrado");
    }

    async addProduct(product) {
        const prods = await this.readProducts();
        const nextId = await this.getNextId();
        product.id = nextId;
        prods.push(product);
        await this.writeProducts(prods);
    }

    async updateProduct(code, updatedProduct) {
        const prods = await this.readProducts();
        const index = prods.findIndex(prod => prod.code === code);

        if (index !== -1) {
            prods[index] = { ...prods[index], ...updatedProduct };
            await this.writeProducts(prods);
        } else {
            console.log("Producto no encontrado");
        }
    }

    async deleteProduct(code) {
        const prods = await this.readProducts();
        const filteredProducts = prods.filter(prod => prod.code !== code);

        if (filteredProducts.length < prods.length) {
            await this.writeProducts(filteredProducts);
        } else {
            console.log("Producto no encontrado");
        }
    }
}

const path = './productos.json';
const productManager = new ProductManager(path);

const product1 = {
    title: "Camiseta",
    description: "Camiseta de Messi con dorsal n°10",
    price: 20000,
    thumbnail: "ruta-de-imagen",
    code: "1",
    stock: 10,
};

const product2 = {
    title: "Short",
    description: "Pantalón numero 10",
    price: 15000,
    thumbnail: "ruta-de-imagen",
    code: "2",
    stock: 15,
};

const product3 = {
    title: "Botines",
    description: "Botines Nike",
    price: 15000,
    thumbnail: "ruta-de-imagen",
    code: "3",
    stock: 8,
};

(async () => {
    try {
        await productManager.addProduct(product1);
        await productManager.addProduct(product2);
        await productManager.addProduct(product3);

        console.log("Lista de productos:");
        await productManager.getProducts();

        const productCode = "2";
        await productManager.getProductByCode(productCode);
    } catch (error) {
        console.error(error.message);
    }
})();
