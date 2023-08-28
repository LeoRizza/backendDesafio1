const realTimeProductsList = document.getElementById('realTimeProductsList');

const socket = io();

socket.emit('mensajeConexion', "Hola socket");

socket.on('realtimeProducts', (products) => {

    realTimeProductsList.innerHTML = '';

    products.map((product) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.title} - Precio: $${product.price}`;
        realTimeProductsList.appendChild(listItem);
    });
});


