import { logger, loggerError } from "../utils/logger.js";
import cartsDAOMongoDB from "../daos/cartsDAOMongoDB.js"
import CartService from "../services/cartService.js";
export const cartStorage = new cartsDAOMongoDB();
export const cartService = new CartService(cartStorage);

//CART CONTROLLERS
export const getCarts = async (req, res) => {
        return cartService.getCarts()
        .then(carritos => {
            return res.json({carritos})
        })
        .catch(err => {res.send(err); loggerError.error(err);})
    }

export const getCartProducts = async (req, res) => {
        const cartId = req.params.id;
        return cartService.getCartProducts(cartId)
        .then(data => {
            return res.json({Productos: [data.products]})
        })
        .catch(err => {res.send(err); loggerError.error(err);});
    }

export const newCart = async (req, res) => {
        const cart = req.body;
        return cartService.postElem(cart)
        .then(_ => {
            logger.info('carrito guardado')
        })
        .catch(err => loggerError.error(`Error: ${err.message}`))
    }

export const addToCart = async (req, res) => {
        const product = req.body;
        const ownerId = req.params.id;
        return cartService.addToCart(product, ownerId)
        .then(_ => {
            logger.info('Producto agregado al carrito')
            res.redirect(`/mycart/${req.user._id}`)
        })
        .catch(err => loggerError.error(err))
    }

export const deleteCart = async (req, res) => {
        const cartId = req.params.id;
        return cartService.deleteElem(cartId)
        .then(_ => logger.info('Carrito eliminado'))
        .catch(err => loggerError.error(err));
    }

export const deleteProdCart = async (req, res) => {
        const {id, id_prod} = req.params;
        return cartService.deleteProd(id, id_prod)
        .then(_ => {
            logger.info('Producto eliminado del carrito')
            res.redirect(`/mycart/${req.user._id}`)
        })
        .catch(err => loggerError.error("No se encontró el producto con dicha id", err));
    }
