import Router from 'koa-router';
import { getProducts, getProduct, createProduct, changeProduct, deleteProduct } from "../controllers/products.controller.js";
import {validatePost, validatePut, validateAdmin} from "../middlewares/middlewares.js";

const productsRouter = new Router({
    prefix: '/api/products'
})

productsRouter.get('/', getProducts)
productsRouter.get('/:id', getProduct)
productsRouter.post('', validatePost(), createProduct)
productsRouter.put('/:id', validatePut(), changeProduct)
productsRouter.delete('/:id', deleteProduct)

export default productsRouter;