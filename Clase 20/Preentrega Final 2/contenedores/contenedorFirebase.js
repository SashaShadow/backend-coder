import knex from 'knex';

class Api {
    constructor(tabla, options) {
        this.tabla = tabla;
        this.knex = knex(options);
    }

    //JSON response
    async getProducts(req, res) {
        let knex = this.knex;
        let productos = [];
        return knex.from(this.tabla).select("*")
        .then((rows) => {
            for (let row of rows) {
                productos.push({
                    id: row["id"],
                    name: row["name"],
                    price: row["price"],
                    code: row["code"],
                    stock: row["stock"],
                    photo: row["photo"],
                    desc: row["desc"]
                })
            }
        })
        .then(() => res.json({productos: productos}))
        .catch(err => {res.send(err); throw err})
    }

    //ARRAY response
    async getAll(req, res) {
        let productos = [];
        let knex = this.knex;
        return knex.from(this.tabla).select("*")
        .then((rows) => {
            for (let row of rows) {
                productos.push({
                    id: row["id"],
                    name: row["name"],
                    price: row["price"],
                    code: row["code"],
                    stock: row["stock"],
                    photo: row["photo"],
                    desc: row["desc"]
                })
            }
            return productos;
        })
        .then((data) => {
            return data })
        .catch(err => {res.send(err); throw err})
    }


    async getProduct(req, res) {
        let knex = this.knex;
        let producto = "";
        return knex.from(this.tabla).select("*").where("id", "=", Number(req.params.id))
        .then((rows) => {
            for (let row of rows) {
                producto = {
                    id: row["id"],
                    name: row["name"],
                    price: row["price"],
                    code: row["code"],
                    stock: row["stock"],
                    photo: row["photo"],
                    desc: row["desc"]
                }
            }
            res.json({producto})
        }).catch(err => {console.log(err); throw err})
    }

    async postProduct(req, res) {
        let knex = this.knex;
        const productoNuevo = req.body;
        let tabla = this.tabla;

        if (productoNuevo.name && productoNuevo.price && productoNuevo.photo && 
            productoNuevo.desc && productoNuevo.code && productoNuevo.stock && productoNuevo.pw === "fx88fx" && 
            Object.keys(productoNuevo).length === 7) {
                delete productoNuevo.pw;
                knex(tabla).insert(productoNuevo)
                .then(() => res.json({Mensaje: "datos insertados"}))
                .catch(err => {console.log(err); throw err})
        } else {
            return res.status(400).send({ error: "parametros incorrectos" });
        }
    }

    async putProduct(req, res) {
        let tabla = this.tabla;
        let knex = this.knex;
        const prodMod = req.body;

        const format = prodMod.name && prodMod.price && prodMod.photo && 
        prodMod.desc && prodMod.code && prodMod.stock && prodMod.pw === "fx88fx" &&
        Object.keys(prodMod).length === 7 ? true : null;

        if (format) {
            delete prodMod.pw;
            knex.from(tabla).where("id", "=", Number(req.params.id)).update(prodMod)
            .then(() => res.json({Mensaje: "Producto actualizado"}))
            .catch(err => {res.status(404).send({Mensaje: `${err} Producto no encontrado`}); throw err})
        }
        
        if (!format) {
            res.send({error: "El formato del producto no es correcto"})
        }
    }

    async deleteProduct(req, res) { 
        let knex = this.knex;
        const pw = req.body.pw;
        const tabla = this.tabla;

        if (pw === "fx88fx") {
            knex.from(tabla).where("id", "=", Number(req.params.id)).del()
            .then(() => res.json({ Mensaje: "Producto eliminado"}))
            .catch(err => {res.status(404).send({Mensaje: `${err} Producto no encontrado`}); throw err})
        } else {
            res.json({Mensaje: "No estás autorizado a acceder a esta ruta"});
        }
    }
}

export default Api;