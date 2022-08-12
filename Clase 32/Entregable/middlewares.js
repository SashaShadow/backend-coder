<<<<<<< HEAD
import { logger } from "./logger.js";
=======
>>>>>>> 75a020e7c67eb5347a0b1ced3cfa1f280bbb3646

export const validatePost = () => {
    return (req, res, next) => {
        const productoNuevo = req.body;
        if (productoNuevo.name && productoNuevo.price && productoNuevo.photo && 
            productoNuevo.desc && productoNuevo.code && productoNuevo.stock && 
            Object.keys(productoNuevo).length === 6) {
                next();
        } else {
            return res.status(400).send({ error: "parametros incorrectos" });
        }
    }
}

export const validatePut = () => {
    return (req, res, next) => {
        const prodMod = req.body;
        const format = prodMod.name && prodMod.price && prodMod.photo && 
        prodMod.desc && prodMod.code && prodMod.stock && 
        Object.keys(prodMod).length === 6 ? true : null;

        if (format) {
            next();
        } else {
            res.send({error: "El formato del producto no es correcto"})
        }
    }
<<<<<<< HEAD
}

export const logger200 = () => {
    return (req, res, next) => {
        logger.info(`ruta ${req.originalUrl} método ${req.method}`);
        console.log(`ruta ${req.originalUrl} método ${req.method}`);
        next();
    }
}

export const logger404 = () => {
    return (req, res, next) => {
        logger.warn(`ruta ${req.originalUrl} método ${req.method} no implementada`);
        res.status(404).send({error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`});
      };
=======
>>>>>>> 75a020e7c67eb5347a0b1ced3cfa1f280bbb3646
}