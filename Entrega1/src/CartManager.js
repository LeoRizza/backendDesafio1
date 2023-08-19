class CartManager {
    constructor() {
        this.carts = [];
        this.currentCartId = 1;
    }

    createCart() {
        const newCart = {
            id: this.currentCartId,
            products: []
        };
        this.carts.push(newCart);
        this.currentCartId++;
        return newCart;
    }

    getCartById(cartId) {
        return this.carts.find(cart => cart.id === cartId);
    }

    addProductToCart(cartId, productId, quantity) {
        const cart = this.getCartById(cartId);
        if (!cart) {
            return false;
        }

        const existingProduct = cart.products.find(product => product.product === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        return true;
    }
}

export default CartManager;
