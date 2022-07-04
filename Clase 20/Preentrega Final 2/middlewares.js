
export const validatePost = () => {
    return (req, res, next) => {
        const productoNuevo = req.body;
        if (productoNuevo.name && productoNuevo.price && productoNuevo.photo && 
            productoNuevo.desc && productoNuevo.code && productoNuevo.stock && productoNuevo.pw === "fx88fx" && 
            Object.keys(productoNuevo).length === 7) {
                next();
        } else if (!productoNuevo.pw) {
            res.json({Mensaje: "No estas autorizado a acceder a esta ruta"})
        } else {
            return res.status(400).send({ error: "parametros incorrectos" });
        }
    }
}

export const validateAddToCart = () => {
    return (req, res, next) => {
        const product = req.body;

        if (process.env.STORAGE === 'firebase') {
            if (product.name && product.price && product.photo && 
                product.desc && product.code && product.stock && product.id && 
                Object.keys(product).length === 7) {
                    next();
            } else if (!product.id) {
                res.json({Error: "Todo producto necesita una ID propia"})
            } else {
                return res.status(400).send({error: "parametros incorrectos"})
            }
        } else {
            if (product.name && product.price && product.photo && 
                product.desc && product.code && product.stock &&
                Object.keys(product).length === 6) {
                    next();
            } else {
                return res.status(400).send({error: "parametros incorrectos"})
            }
        }
    }
}


export const validateDelete = () => {
    return (req, res, next) => {
        const pw = req.body.pw;
        if (pw === "fx88fx") {
            next()
        } else {
            res.json({Mensaje: "No estás autorizado a acceder a esta ruta"});
        }
    }
}


export const validatePut = () => {
    return (req, res, next) => {
        const prodMod = req.body;
        const format = prodMod.name && prodMod.price && prodMod.photo && 
        prodMod.desc && prodMod.code && prodMod.stock && prodMod.pw === "fx88fx" &&
        Object.keys(prodMod).length === 7 ? true : null;

        if (format) {
            next();
        } else if (!prodMod.pw) {
            res.json({Mensaje: "No estas autorizado a acceder a esta ruta"})
        } else {
            res.send({error: "El formato del producto no es correcto"})
        }
    }
}