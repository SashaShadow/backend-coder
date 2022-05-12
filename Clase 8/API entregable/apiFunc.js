
class Api {
    constructor(productos) {
        this.productos = productos;
    }

    getProducts(req, res) {
        res.json({productos: this.productos});
        console.log(this.productos.length);
    }

    getProduct(req, res) {
        const producto = this.productos.find(elem => elem.id === Number(req.params.id))
        const prodIndex = this.productos.findIndex(elem => elem.id === Number(req.params.id))
        console.log(prodIndex);

        if (producto) {
            res.json({producto})
        } else {
            res.status(404).json({error: "Producto no encontrado"})
        }
    }

    postProduct(req, res) {
        const productoNuevo = req.body;

        if (productoNuevo.title && productoNuevo.price && productoNuevo.thumbnail && Object.keys(productoNuevo).length === 3) {
            const longitud = this.productos.length;
            longitud ? productoNuevo.id = this.productos[longitud - 1].id + 1 : productoNuevo.id = 1 ;
            this.productos.push(productoNuevo);
            res.json(this.productos);
        } else {
            return res.status(400).send({ error: "parametros incorrectos" });
        }
    }

    putProduct(req, res) {
        const prodMod = req.body;

        const format = prodMod.title && prodMod.price && prodMod.thumbnail && 
        Object.keys(prodMod).length === 3 ? true : null;

        const prodIndex = this.productos.findIndex(elem => elem.id === Number(req.params.id))

        const producto = this.productos.find(elem => elem.id === Number(req.params.id));

        if (format && producto) {
            prodMod.id = this.productos[prodIndex].id;
            this.productos[prodIndex] = prodMod;
            return res.send("Producto modificado");
        } 
    
        if (!producto) {
            return res.status(404).send({error: "Producto no encontrado"})
        }

        if (!format) {
            res.send({error: "El formato del producto no es correcto (debe tener un title, un price y un thumbnail"})
        }
    }

    deleteProduct(req, res) {
        const prodIndex = this.productos.findIndex(elem => elem.id === Number(req.params.id));

        if (prodIndex < 0) {
            return res.status(404).send({error: "Producto no encontrado"})
        }

        this.productos.splice(prodIndex, 1);
        res.send("Producto eliminado");
    }
}

module.exports = Api;