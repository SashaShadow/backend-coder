import {validatePost, validatePut, validateAdmin} from "../middlewares/middlewares.js";
import { getProducts, getProduct, createProduct, changeProduct, deleteProduct } from "../controllers/productsController.js";
import express from "express";
const { Router } = express;
const productsRouter = Router()

export default productsRouter;

productsRouter.get('', getProducts)
productsRouter.get('/:id', getProduct)
productsRouter.post('', validatePost(), createProduct)
productsRouter.put('/:id', validatePut(), changeProduct)
productsRouter.delete('/:id', deleteProduct)