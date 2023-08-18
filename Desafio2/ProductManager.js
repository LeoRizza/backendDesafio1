export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getNextId() {
        return await file.getNextId(this.path);
    }

    async readProducts() {
        return await file.readProducts(this.path);
    }

    async writeProducts(products) {
        return await file.writeProducts(this.path, products);
    }

    async getProducts() {
        return await file.getProducts(this.path);
    }

    async getProductByCode(code) {
        return await file.getProductByCode(this.path, code);
    }

    async addProduct(product) {
        return await file.addProduct(this.path, product);
    }

    async updateProduct(code, updatedProduct) {
        return await file.updateProduct(this.path, code, updatedProduct);
    }

    async deleteProduct(code) {
        return await file.deleteProduct(this.path, code);
    }
}