import getStorage from "../daos/index.js";
import {validateDelete, validatePost, validatePut} from "../middlewares.js";
import express from "express";
const { Router } = express;
const productsRouter = Router()
const productsStorage = getStorage().products

export default productsRouter;

productsRouter.get('', (req, res) => {
    return productsStorage.getElems(req, res)
    .then(productos => {
      return res.json({productos})
    })
    .catch(err => {res.send(err); throw err})
})

productsRouter.get('/:id', (req, res) => {
    return productsStorage.getElem(req, res)
    .then(producto => {
        return res.json({producto})
    })
    .catch(err => {res.send(err); throw err})
})

productsRouter.post('', validatePost(), (req, res) => {
    return productsStorage.postElem(req, res)
})

productsRouter.put('/:id', validatePut(), (req, res) => {
    return productsStorage.putElem(req, res)
})

productsRouter.delete('/:id', validateDelete(), (req, res) => {
    return productsStorage.deleteElem(req, res)
})