import { logger, loggerError } from "../utils/logger.js";
import productsDAOMongoDB from "../daos/productsDAOMongoDB.js";
import ProductsService from "../services/productsService.js";
export const productsStorage = new productsDAOMongoDB();
export const productService = new ProductsService(productsStorage);

export const getProducts = async (req, res) => {
    return productService.getProducts()
    .then(productos => {
      return res.json({productos})
    })
    .catch(err => {res.send(err); loggerError.error(err);})
}

export const getProduct = async (req, res) => {
    const prodId = req.params.id;
    return productService.getProduct(prodId)
    .then(producto => {
        return res.json({producto})
    })
    .catch(err => {res.send(err);loggerError.error(err);})
}

export const createProduct = async (req, res) => {
    const newProd = req.body;
    return productsService.createProduct(newProd)
    .then(_ => {
        logger.info('Producto creado')
    })
    .catch(err => loggerError.error(err));
}

export const changeProduct = async (req, res) => {
    const prodMod = req.body;
    const prodId = req.params.id;
    return productService.changeProduct(prodId, prodMod)
    .then(_ => logger.info('Producto modificado'))
    .catch(err => loggerError.error(err));
}

export const deleteProduct = async (req, res) => {
    const prodId = req.params.id;
    return productService.deleteProduct(prodId)
    .then(_ => logger.info('Producto eliminado'))
    .catch(err => loggerError.error(err));
}