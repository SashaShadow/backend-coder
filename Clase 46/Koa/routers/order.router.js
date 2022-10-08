import Router from 'koa-router';
import { validateAdmin, validateNewOrder } from "../middlewares/middlewares.js";
import { createOrder, getOrders } from "../controllers/order.controller.js";

const orderRouter = new Router({
    prefix: '/api/orders'
})
export default orderRouter;

orderRouter.get('/', getOrders)
orderRouter.post('/', validateNewOrder(), createOrder);