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
})

cartRouter.get('/:id/products', (req, res) => {
    return cartStorage.getCartProds(req, res)
   
})

cartRouter.post('', (req, res) => {
    return cartStorage.postElem(req, res)
    .then(carrito => {
        console.log('carrito guardado', carrito)
        res.json({Mensaje: "Carrito creado"})
    })
    .catch(err => console.error(`Error: ${err.message}`))
})

cartRouter.post('/:id/products', (req, res) => {
    return cartStorage.addToCart(req, res)
})


cartRouter.delete('/:id', (req, res) => {
    return cartStorage.deleteElem(req, res);
})

cartRouter.delete('/:id/products/:id_prod', (req, res) => {
    return cartStorage.deleteCartProd(req, res);
})