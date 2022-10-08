import { logger, loggerError } from "../utils/logger.js";
import ProductRepository from "../repository/product.repository.js";
import ProductsService from "../services/products.service.js";

export const productsStorage = new ProductRepository();
export const productService = new ProductsService(productsStorage);

export const getProducts = async (ctx) => {
    return productService.getProducts()
    .then(productos => {
        ctx.status = 200;
        ctx.body = {
            productos
        };
    })
    .catch(err => {
        loggerError.error(err);
        ctx.status = 404;
        ctx.body = {error: err.toString()}
    });
}

export const getProduct = async (ctx) => {
    const prodId = ctx.params.id;
    return productService.getProduct(prodId)
    .then(producto => {
        ctx.status = 200;
        return ctx.body = {producto};
    })
    .catch(err => {
        loggerError.error(err);
        ctx.status = 404;
        ctx.body = {error: err.toString()}
    });
}

export const createProduct = async (ctx) => {
    const newProd = ctx.request.body;
    return productService.createProduct(newProd)
    .then(product => {
        logger.info('Producto creado')
        ctx.status = 201;
        ctx.body = {product}
    })
    .catch(err => {
        loggerError.error(err);
        ctx.status = 400;
        ctx.body = {error: err.toString()}
    });
}

export const changeProduct = async (ctx) => {
    const prodMod = ctx.request.body;
    const prodId = ctx.params.id;
    return productService.changeProduct(prodId, prodMod)
    .then(product => {
        logger.info('Producto modificado')
        ctx.status = 201;
        ctx.body = {product}
    })
    .catch(err => {
        loggerError.error(err);
        ctx.status = 400;
        ctx.body = {error: err.toString()}
    });
}

export const deleteProduct = async (ctx) => {
    const prodId = ctx.params.id;
    return productService.deleteProduct(prodId)
    .then(_ => {
        logger.info('Producto eliminado')
        ctx.status = 200;
        ctx.body = {mensaje: 'Producto eliminado'};
    })
    .catch(err => {
        loggerError.error(err);
        ctx.status = 404;
        ctx.body = {error: err.toString()}
    });
}