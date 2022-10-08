import { loggerError } from "../utils/logger.js";
import OrderService from "../services/orderService.js";
import DAOFactory from "../factory/DAOfactory.js";
const myDAO = new DAOFactory();
export const orderStorage = myDAO.getOrderDAO();
const orderService = new OrderService(orderStorage);

export const getOrders = async (ctx) => {
    return orderService.getOrders()
    .then(ordenes => {
        ctx.status = 200;
        ctx.body = {ordenes};
    })
    .catch(err => {ctx.body = {error: err}; loggerError.error(err);})
}

export const createOrder = async (ctx) => {
    const orderData = ctx.request.body;
    orderData.order.products = JSON.parse(orderData.order.products);

    return orderService.createOrder(orderData)
    .then(data => ctx.body = {data})
    .catch(err => {ctx.body = {error: err}; loggerError.error(err);})
}