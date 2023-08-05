class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            throw new Error("Todos los campos son obligatorios para agregar un producto.");
        }

        const productWithSameCode = this.products.find((p) => p.code === product.code);
        if (productWithSameCode) {
            throw new Error(`El código "${product.code}" ya está en uso por otro producto.`);
        }

        product.id = this.nextId++;
        this.products.push(product);
        console.log(`Producto "${product.title}" agregado con éxito.`);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        
        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado.");
        }
    }
}

const productManager = new ProductManager();

try {
    productManager.addProduct({
        title: "Camiseta",
        description: "Camiseta de Messi con dorsal n°10",
        price: 20000,
        thumbnail: "ruta-de-imagen",
        code: "A001",
        stock: 10,
    });

    productManager.addProduct({
        title: "Short",
        description: "Pantalón numero 10",
        price: 15000,
        thumbnail: "ruta-de-imagen",
        code: "B001",
        stock: 15,
    });

    productManager.addProduct({
        title: "Botines",
        description: "Botines Nike",
        price: 15000,
        thumbnail: "ruta-de-imagen",
        code: "C001",
        stock: 8,
    });

    console.log("Lista de productos:");
    console.log(productManager.getProducts());

    const productId = 2;
    const productById = productManager.getProductById(productId);
    console.log(`ID del producto = ${productId}:`, productById);
} catch (error) {
    console.error(error.message);
}
