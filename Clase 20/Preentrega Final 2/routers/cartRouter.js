import getStorage from "../daos/index.js";

import express from "express";
const { Router } = express;
const cartRouter = Router()
const cartStorage = getStorage().cart

export default cartRouter;

cartRouter.get('', (req, res) => {
    return cartStorage.getElems(req, res)
    .then(carritos => {
      console.log(carritos)
      return res.json({carritos})
    })
    .catch(err => {res.send(err); throw err})
    .finally(() => process.exit())
})

cartRouter.get('/:id', (req, res) => {
    return cartStorage.getElem(req, res)
    .then(carrito => {
        console.log(carrito)
        return res.json({carrito})
    })
    .catch(err => {res.send(err); throw err})
    .finally(() => process.exit())

})

cartRouter.post('', (req, res) => {
    return cartStorage.postElem(req, res)
    .then(carrito => {
        console.log('carrito guardado', carrito)
    })
    .catch(err => console.error(`Error: ${err.message}`))
    .finally(_ => process.exit())
})

cartRouter.put('', (req, res) => {
    return cartStorage.putElem(req, res);

})

cartRouter.delete('', (req, res) => {
    return cartStorage.deleteElem(req, res);

})