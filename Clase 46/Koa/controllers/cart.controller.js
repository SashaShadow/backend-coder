import { logger, loggerError } from "../utils/logger.js";
import CartService from "../services/cartService.js";
import DAOFactory from "../factory/DAOfactory.js";
const myDAO = new DAOFactory();
export const cartStorage = myDAO.getCartDAO();
export const cartService = new CartService(cartStorage);

//CART CONTROLLERS
export const getCarts = async (ctx) => {
        return cartService.getCarts()
        .then(carritos => {
            ctx.status = 200;
            ctx.body = {
                carritos
            }
        })
        .catch(err => {ctx.body = {err}; loggerError.error(err);})
    }

export const getCartProducts = async (ctx) => {
        const cartId = ctx.params.id;
        return cartService.getCartProducts(cartId)
        .then(data => {
            ctx.body = {Productos: [data.products]}
        })
        .catch(err => {ctx.body = {err}; loggerError.error(err);})
    }

export const addToCart = async (ctx) => {
        const product = ctx.request.body;
        const ownerId = ctx.params.id;
        return cartService.addToCart(product, ownerId)
        .then(_ => {
            logger.info('Producto agregado al carrito')
            // ctx.redirect(`/mycart/${req.user._id}`)
        })
        .catch(err => loggerError.error(err))
    }

export const deleteCart = async (ctx) => {
        const cartId = ctx.params.id;
        return cartService.deleteElem(cartId)
        .then(_ => logger.info('Carrito eliminado'))
        .catch(err => loggerError.error(err));
    }

export const deleteProdCart = async (ctx) => {
        const {id, id_prod} = ctx.params;
        return cartService.deleteProd(id, id_prod)
        .then(_ => {
            logger.info('Producto eliminado del carrito')
            // res.redirect(`/mycart/${req.user._id}`)
        })
        .catch(err => loggerError.error("No se encontró el producto con dicha id", err));
    }
