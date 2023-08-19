class CartManager {
    constructor() {
        this.cart = [];
    }

    addToCart(product) {
        this.cart.push(product);
    }

    getCart() {
        return this.cart;
    }

    removeFromCart(productId) {
        const index = this.cart.findIndex(item => item.id === productId);
        if (index !== -1) {
            this.cart.splice(index, 1);
        }
    }
}

export default CartManager;
