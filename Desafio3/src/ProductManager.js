import { promises as fs } from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.id = 11;
    }

    async addProduct(product) {
        const products = await this.readProducts();
        const nextId = products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
        product.id = nextId;
        if (product.stock < 0) {
            console.log("El stock no puede ser negativo");
            return;
        }

        products.push(product);
        await this.writeProducts(products);
    }

    async getProducts() {
        const products = await this.readProducts();
        return products;
    }

    async getProductById(id) {
        const products = await this.readProducts();
        const product = products.find(product => product.id === id);

        if (product) {
            return product;
        } else {
            return { message: "Producto no encontrado" };
        }
    }

    async updateProduct(id, updatedProduct) {
        const products = await this.readProducts();
        const index = products.findIndex(prod => prod.id === id);

        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            await this.writeProducts(products);
        } else {
            console.log("Producto no encontrado");
        }
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
        await fs.writeFile(this.path, JSON.stringify(products), 'utf-8');
    }
}

export default ProductManager;
