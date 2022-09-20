import { strict as assert } from 'assert';
import ProductsTestDAOMongoDB from "../daos/productsTestDAOMongoDB.js";

describe('Tests a los metodos CRUD de los productos', function() {

    it('should list all products', async function() {
        this.timeout(5000);
        const prodAPI = new ProductsTestDAOMongoDB();
        const allProducts = await Promise.resolve(prodAPI.getElems());
        assert.strictEqual(allProducts.length, 0);
    })

    it('should add a product', async function() {
        this.timeout(5000);
        const prodAPI = new ProductsTestDAOMongoDB();
        const product = {
            name: "prueba",
            price: 1,
            stock: 5,
            photo: "no hay",
            code: "prb1",
            desc: "producto de prueba"
        }

        await prodAPI.postElem(product);
        const allProducts = await Promise.resolve(prodAPI.getElems());
        assert.strictEqual(allProducts.length, 1);
    })

    it('shoud list product with given code', async function() {
        this.timeout(5000);
        const prodAPI = new ProductsTestDAOMongoDB();
        const products = await Promise.resolve(prodAPI.getElems());
        const prodId = products[0].id;
        const foundProd = await Promise.resolve(prodAPI.getElem(prodId));
        assert.strictEqual(foundProd[0].code, 'prb1');
    })

    it('should update test product', async function() {
        this.timeout(5000);
        const prodAPI = new ProductsTestDAOMongoDB();
        const products = await Promise.resolve(prodAPI.getElems());
        const prodId = products[0].id;
        const updatedProduct = {
            name: "prueba2",
            price: 1,
            stock: 5,
            photo: "no hay",
            code: "prb1",
            desc: "producto de prueba"
        }

        await prodAPI.putElem(prodId, updatedProduct);
        const foundProd = await Promise.resolve(prodAPI.getElem(prodId));
        assert.strictEqual(foundProd[0].name, updatedProduct.name);
    })

    it('should delete test product', async function() {
        this.timeout(5000);
        const prodAPI = new ProductsTestDAOMongoDB();
        const products = await Promise.resolve(prodAPI.getElems());
        const prodId = products[0].id;

        await prodAPI.deleteElem(prodId);
        const allProducts = await Promise.resolve(prodAPI.getElems());
        assert.strictEqual(allProducts.length, 0);
    })

    before(function() {
        console.log('\n ------------------------COMIENZO TOTAL DEL TEST----------------------------')
    })

    after(function() {
        console.log('\n ------------------------FIN TOTAL DEL TEST----------------------------')
    })

    beforeEach(function() {
        console.log('\n ------------------------COMIENZO DEL TEST----------------------------')
    })

    afterEach(function() {
        console.log('\n ------------------------FIN DEL TEST----------------------------') 
    })  

})