import { logger, loggerWarn, loggerError } from "../utils/logger.js";
import twilio from 'twilio';
import "dotenv/config.js";

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = twilio(accountSid, authToken)

export const validateAdmin = () => {
    return (req, res, next) => {
        if (!req.user || !req.user.admin) {
            return res.status(403).json({Error: 'No tienes acceso a esta ruta'})
        }
        next()
    }
}

export const validateNumber = () => {
    return (req, res, next) => {
      const newPhone = req.body.phone;
      let phoneError = true;
  
     client.lookups.v1.phoneNumbers(newPhone)
      .fetch({type: ['carrier']})
      .then(_ => {
        phoneError = false;
        req.session.phoneError = '';
      })
      .catch(err => loggerError.error(err))
      .finally(_ => {
          if (phoneError) {
            req.session.phoneError = 'Numero invalido'
          } 
          next()
        })
     }
  }

export const uploadFile = () => { 
    return (req, res, next) => {
      const file = req.file
      if (!file) {
        return next()
      }
      req.session.img = file.filename;
      next();
    }
  }

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
            res.status(400).send({error: "El formato del producto no es correcto"})
        }
    }
}

export const validateAddToCart = () => {
    return (req, res, next) => {
        const product = req.body;
        if (product.name && product.price && product.photo && 
            product.desc && product.code && product.stock) {
                next();
        } else {
            return res.status(400).send({error: "parametros incorrectos"})
        }
    }
}

export const validateNewOrder = () => {
    return (req, res, next) => {
        const order = req.body; 
        if (order.client && order.order && order.owner) {
            next();
        } else {
            return res.status(400).send({error: "parametros de orden incorrectos"})
        }
    }
}

export const logger200 = () => {
    return (req, res, next) => {
        logger.info(`ruta ${req.originalUrl} método ${req.method}`);
        next();
    }
}

export const logger404 = () => {
    return (req, res, next) => {
        loggerWarn.warn(`ruta ${req.originalUrl} método ${req.method} no implementada`);
        res.status(404).send({error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`});
      };
}