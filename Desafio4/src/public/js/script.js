const realTimeProductsList = document.getElementById('realTimeProductsList');
const addProductForm = document.getElementById('addProductForm');
const deleteProductForm = document.getElementById('deleteProductForm');
const deleteProductIdInput = document.getElementById('deleteProductId');
const socket = io();

socket.emit('mensajeConexion', "Hola socket");

function updateProductList(products) {
    realTimeProductsList.innerHTML = '';

    products.map((product) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${product.title} - Precio: $${product.price}
        `;
        realTimeProductsList.appendChild(listItem);
    });

    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            socket.emit('deleteProduct', productId);
        });
    });
}

socket.on('realtimeProducts', (products) => {
    updateProductList(products);
});

addProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;
    const stock = parseInt(document.getElementById('stock').value);
    const code = document.getElementById('code').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const price = parseFloat(document.getElementById('price').value);

    if (!title || !description || !status || isNaN(stock) || !code || !thumbnail || isNaN(price)) {
        return;
    }

    const newProduct = {
        title,
        description,
        status,
        stock,
        code,
        thumbnail,
        price,
    };

    socket.emit('addProduct', newProduct);
    addProductForm.reset();
});

deleteProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const productId = parseInt(deleteProductIdInput.value);

    if (isNaN(productId)) {
        return;
    }

    socket.emit('deleteProduct', productId);
    deleteProductForm.reset();
});
