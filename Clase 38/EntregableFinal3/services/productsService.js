class ProductsService {
    constructor(repository) {
        this.repository = repository;
    }

    async getProducts() {
        return this.repository.getElems();
    }

    async getProduct(id) {
        return this.repository.getElem(id);
    }

    async createProduct(product) {
        return this.repository.postElem(product);
    }

    async changeProduct(prodId, prodMod) {
        return this.repository.putElem(prodId, prodMod);
    }

    async deleteProduct(prodId) {
        return this.repository.deleteElem(prodId);
    }
}

export default ProductsService;