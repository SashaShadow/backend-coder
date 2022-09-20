import express from "express";
import { getCarts, getCartProducts, newCart, addToCart, deleteCart, deleteProdCart } from "../controllers/cartController.js";
import { validateAddToCart, validateAdmin } from "../middlewares/middlewares.js";

const { Router } = express;
const cartRouter = Router()

export default cartRouter;

cartRouter.get('', validateAdmin(), getCarts);
cartRouter.get('/:id/products', getCartProducts);
cartRouter.post('', newCart);
cartRouter.post('/:id/products', validateAddToCart(), addToCart);
cartRouter.delete('/:id', validateAdmin(), deleteCart);
cartRouter.delete('/:id/products/:id_prod', deleteProdCart);