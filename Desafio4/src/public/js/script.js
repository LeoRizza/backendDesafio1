/* const realTimeProductsList = document.getElementById('realTimeProductsList');

const socket = io();

socket.emit('mensajeConexion', "Hola socket");

socket.on('realtimeProducts', (products) => {
    realTimeProductsList.innerHTML = '';

    products.map((product) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${product.title} - Precio: $${product.price}
        `;
        realTimeProductsList.appendChild(listItem);
    });
});

const addProductForm = document.getElementById('addProductForm');

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

 */

const realTimeProductsList = document.getElementById('realTimeProductsList');
const addProductForm = document.getElementById('addProductForm');
const deleteProductForm = document.getElementById('deleteProductForm');
const deleteProductIdInput = document.getElementById('deleteProductId');
const socket = io();

socket.emit('mensajeConexion', "Hola socket");

// Función para actualizar la lista de productos
function updateProductList(products) {
    realTimeProductsList.innerHTML = '';

    products.map((product) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${product.title} - Precio: $${product.price}
        `;
        realTimeProductsList.appendChild(listItem);
    });

    // Agregar eventos click a los botones de eliminar
    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-id');
            socket.emit('deleteProduct', productId);
        });
    });
}

// Escuchar los productos en tiempo real
socket.on('realtimeProducts', (products) => {
    updateProductList(products);
});

// Escuchar el evento de envío de formulario para agregar producto
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

// Escuchar el evento de envío de formulario para eliminar producto por ID
deleteProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const productId = parseInt(deleteProductIdInput.value);

    if (isNaN(productId)) {
        return;
    }

    socket.emit('deleteProduct', productId);
    deleteProductForm.reset();
});
