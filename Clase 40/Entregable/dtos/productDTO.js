class ProductDTO {
    constructor(rawProd) {
        this.name = rawProd.name;
        this.price = rawProd.price;
        this.stock = rawProd.stock;
        this.photo = rawProd.photo;
        this.code = rawProd.code;
        this.desc = rawProd.desc;
    }
}

export default ProductDTO;