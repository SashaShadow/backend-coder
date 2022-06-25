import Api from "./apiFunc.js";

export const validatePost = () => {
    return (req, res, next) => {
        const productoNuevo = req.body;
        if (productoNuevo.name && productoNuevo.price && productoNuevo.photo && 
            productoNuevo.desc && productoNuevo.code && productoNuevo.stock && productoNuevo.pw === "fx88fx" && 
            Object.keys(productoNuevo).length === 7) {
                next();
        } else {
            return res.status(400).send({ error: "parametros incorrectos" });
        }
    }
}

const myApi = new Api("productos.json"); 
const objetos = await myApi.getAll();

export const validatePut = () => {
    return (req, res, next) => {
        const prodMod = req.body;
        const format = prodMod.name && prodMod.price && prodMod.photo && 
        prodMod.desc && prodMod.code && prodMod.stock && prodMod.pw === "fx88fx" &&
        Object.keys(prodMod).length === 7 ? true : null;
        const producto = objetos.find(elem => elem.id === Number(req.params.id));

        if (format && producto) {
            next();
        } else if (!producto) {
            return res.status(404).send({error: "Producto no encontrado"})
        } else if (!format) {
            res.send({error: "El formato del producto no es correcto"})
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

