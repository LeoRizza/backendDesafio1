import fs from 'fs';

export async function getNextId(path) {
    const prods = await readProducts(path);
    return prods.length > 0 ? Math.max(...prods.map(product => product.id)) + 1 : 1;
}

export async function readProducts(path) {
    try {
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export async function writeProducts(path, products) {
    await fs.writeFile(path, JSON.stringify(products));
}

export async function getProducts(path) {
    const prods = await readProducts(path);
    console.log(prods);
}

export async function getProductByCode(path, code) {
    const prods = await readProducts(path);
    const product = prods.find(prod => prod.code === code);

    if (product)
        console.log(product);
    else
        console.log("Producto no encontrado");
}

export async function addProduct(path, product) {
    const prods = await readProducts(path);
    const nextId = await getNextId(path);
    product.id = nextId;
    prods.push(product);
    await writeProducts(path, prods);
}

export async function updateProduct(path, code, updatedProduct) {
    const prods = await readProducts(path);
    const index = prods.findIndex(prod => prod.code === code);

    if (index !== -1) {
        prods[index] = { ...prods[index], ...updatedProduct };
        await writeProducts(path, prods);
    } else {
        console.log("Producto no encontrado");
    }
}

export async function deleteProduct(path, code) {
    const prods = await readProducts(path);
    const filteredProducts = prods.filter(prod => prod.code !== code);

    if (filteredProducts.length < prods.length) {
        await writeProducts(path, filteredProducts);
    } else {
        console.log("Producto no encontrado");
    }
}