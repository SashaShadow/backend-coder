import express from "express";
import { loggerError } from "../logger.js";
import OrderDAOMongoDB from "../orderDAOMongoDB.js"
import { validateAdmin } from "../middlewares.js";

const { Router } = express;
const orderRouter = Router()
export const orderStorage = new OrderDAOMongoDB();

export default orderRouter;

orderRouter.get('', validateAdmin(), async (req, res) => {
    return orderStorage.getElems(req, res)
    .then(ordenes => {
        return res.json({ordenes})
    })
    .catch(err => {res.send(err); loggerError.error(err); throw err})
})

orderRouter.post('', async (req, res) => {
    return orderStorage.createOrder(req, res)
    .then(() => res.redirect('/api/'))
    .catch(err => {res.send(err); loggerError.error(err); throw err})
})