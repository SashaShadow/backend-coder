import Router from 'koa-router';
import { getCarts, getCartProducts, addToCart, deleteCart, deleteProdCart } from "../controllers/cart.controller.js";
import { validateAddToCart, validateAdmin } from "../middlewares/middlewares.js";

const cartRouter = new Router({
    prefix: '/api/carts'
})

export default cartRouter;

cartRouter.get('/', getCarts);
cartRouter.get('/:id/products', getCartProducts);
cartRouter.post('/:id/products', validateAddToCart(), addToCart);
cartRouter.delete('/:id', deleteCart);
cartRouter.delete('/:id/products/:id_prod', deleteProdCart);