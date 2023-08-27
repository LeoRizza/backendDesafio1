const socket = io()

const realTimeProductsList = document.getElementById('realTimeProductsList');

socket.on('updateRealTimeProducts', (products) => {
    realTimeProductsList.innerHTML = '';
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.title} - Precio: ${product.price}`;
        realTimeProductsList.appendChild(listItem);
    });
});


socket.on('productDeleted', (productId) => {
    const productItem = document.querySelector(`li[data-productid="${productId}"]`);
    if (productItem) {
        productItem.remove();
    }
});