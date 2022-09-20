import express from "express";
import { validateAdmin, validateNewOrder } from "../middlewares/middlewares.js";
import { createOrder, getOrders } from "../controllers/orderController.js";

const { Router } = express;
const orderRouter = Router()

export default orderRouter;

orderRouter.get('', validateAdmin(), getOrders)
orderRouter.post('', validateNewOrder(), createOrder);