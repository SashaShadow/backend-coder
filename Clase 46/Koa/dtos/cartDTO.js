class CartDTO {
    constructor(rawCart) {
        this.products = rawCart.products;
        this.owner = rawCart.owner;
    }
}

export default CartDTO;