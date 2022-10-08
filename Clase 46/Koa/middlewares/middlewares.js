import { logger, loggerWarn, loggerError } from "../utils/logger.js";
import twilio from 'twilio';
import "dotenv/config.js";

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = twilio(accountSid, authToken)

export const validateAdmin = () => {
    return async (ctx, next) => {
        if (!ctx.request.user || !ctx.request.user.admin) {
            ctx.status = 403;
            ctx.body = {Error: 'No tienes acceso a esta ruta'}
        }
        next()
    }
}

export const validateNumber = () => {
    return (ctx, next) => {
      const newPhone = ctx.request.body.phone;
      let phoneError = true;
  
     client.lookups.v1.phoneNumbers(newPhone)
      .fetch({type: ['carrier']})
      .then(_ => {
        phoneError = false;
        ctx.request.session.phoneError = '';
      })
      .catch(err => loggerError.error(err))
      .finally(_ => {
          if (phoneError) {
            ctx.request.session.phoneError = 'Numero invalido'
          } 
          next()
        })
     }
  }

export const uploadFile = () => { 
    return (ctx, next) => {
      const file = ctx.request.file
      if (!file) {
        return next()
      }
      ctx.request.session.img = file.filename;
      next();
    }
  }

export const validatePost = () => {
    return (ctx, next) => {
        const productoNuevo = ctx.request.body;
        if (productoNuevo.name && productoNuevo.price && productoNuevo.photo && 
            productoNuevo.desc && productoNuevo.code && productoNuevo.stock && 
            Object.keys(productoNuevo).length === 6) {
                next();
        } else {
            ctx.status = 400;
            ctx.body = { error: "parametros incorrectos" };
        }
    }
}

export const validatePut = () => {
    return (ctx, next) => {
        const prodMod = ctx.request.body;
        const format = prodMod.name && prodMod.price && prodMod.photo && 
        prodMod.desc && prodMod.code && prodMod.stock && 
        Object.keys(prodMod).length === 6 ? true : null;

        if (format) {
            next();
        } else {
            ctx.status = 400;
            ctx.body = {error: "El formato del producto no es correcto"};
        }
    }
}

export const validateAddToCart = () => {
    return (ctx, next) => {
        const product = ctx.request.body;
        if (product.name && product.price && product.photo && 
            product.desc && product.code && product.stock) {
                next();
        } else {
            ctx.status = 400;
            ctx.body = {error: "parametros incorrectos"};
        }
    }
}

export const validateNewOrder = () => {
    return (ctx, next) => {
        const order = ctx.request.body; 
        if (order.client && order.order && order.owner) {
            next();
        } else {
            ctx.status = 400;
            ctx.body = {error: "parametros de orden incorrectos"}
        }
    }
}

export const logger200 = () => {
    return (ctx, next) => {
        logger.info(`ruta ${ctx.request.originalUrl} método ${ctx.request.method}`);
        next();
    }
}

export const logger404 = () => {
    return (ctx, next) => {
        loggerWarn.warn(`ruta ${ctx.request.originalUrl} método ${ctx.request.method} no implementada`);
        ctx.status = 404;
        ctx.body = {error: -2, descripcion: `ruta ${ctx.request.originalUrl} método ${ctx.request.method} no implementada`};
      };
}