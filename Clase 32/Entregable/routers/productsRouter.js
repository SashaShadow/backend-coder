import {validatePost, validatePut} from "../middlewares.js";
<<<<<<< HEAD
import { logger } from "../logger.js";
=======
>>>>>>> 75a020e7c67eb5347a0b1ced3cfa1f280bbb3646
import productsDAOMongoDB from "../productsDAOMongoDB.js"
import express from "express";
const { Router } = express;
const productsRouter = Router()
const productsStorage = new productsDAOMongoDB();

export default productsRouter;

productsRouter.get('', (req, res) => {
    return productsStorage.getElems(req, res)
    .then(productos => {
      return res.json({productos})
    })
<<<<<<< HEAD
    .catch(err => {res.send(err); logger.error(err); throw err})
=======
    .catch(err => {res.send(err); throw err})
>>>>>>> 75a020e7c67eb5347a0b1ced3cfa1f280bbb3646
})

productsRouter.get('/:id', (req, res) => {
    return productsStorage.getElem(req, res)
    .then(producto => {
        return res.json({producto})
    })
<<<<<<< HEAD
    .catch(err => {logger.error(err); throw err; res.send(err);})
=======
    .catch(err => {res.send(err); throw err})
>>>>>>> 75a020e7c67eb5347a0b1ced3cfa1f280bbb3646
})

productsRouter.post('', validatePost(), (req, res) => {
    return productsStorage.postElem(req, res)
})

productsRouter.put('/:id', validatePut(), (req, res) => {
    return productsStorage.putElem(req, res)
})

productsRouter.delete('/:id', (req, res) => {
    return productsStorage.deleteElem(req, res)
})