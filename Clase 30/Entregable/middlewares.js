
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
}