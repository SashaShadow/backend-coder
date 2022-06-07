import fs from "fs";

class Api {
    constructor(archivo) {
        this.archivo = archivo;
    }

    //JSON response
    async getProducts(req, res) {
        try{
            const data = await fs.promises.readFile(this.archivo, "utf-8")
            const objetos = data ? (JSON.parse(data)) : []
            res.json({productos: objetos});
        } 
        catch(err) {
            console.log(err)
        }
    }

    //ARRAY response
    async getAll() {
        try{
            const data = await fs.promises.readFile(this.archivo, "utf-8")
            const objetos = data ? (JSON.parse(data)) : []
            return objetos;
        } 
        catch(err) {
            console.log(err)
        }
    }

    async getProduct(req, res) {
        const objetos = await this.getAll();
        const producto = objetos.find(elem => elem.id === Number(req.params.id))
        if (producto) {
            res.json({producto})
        } else {
            res.status(404).json({error: "Producto no encontrado"})
        }
    }

    async postProduct(req, res) {
        const productoNuevo = req.body;
        let archivo = this.archivo;

        if (productoNuevo.name && productoNuevo.price && productoNuevo.photo && 
            productoNuevo.desc && productoNuevo.code && productoNuevo.stock && productoNuevo.pw === "fx88fx" && 
            Object.keys(productoNuevo).length === 7) {
            const objetos = await this.getAll();
            if (objetos.length) {
                let longit = objetos.length;
                longit ? productoNuevo.id = objetos[longit - 1].id + 1 : productoNuevo.id = 1 ;
                productoNuevo.timestamp = Date.now();
                delete productoNuevo.pw;
                async function agregar() {
                    try {
                        let contenidoNuevo = objetos;
                        contenidoNuevo.push(productoNuevo); 
                        await fs.promises.writeFile(archivo, JSON.stringify(contenidoNuevo, null, 2))
                        res.json({POST: "OK"})
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                agregar();
            } else {
                productoNuevo.id = 1;
                productoNuevo.timestamp = Date.now();
                async function iniciarJson() {
                    try {
                        let contenidoNuevo = [productoNuevo];
                        await fs.promises.writeFile(archivo,  JSON.stringify(contenidoNuevo, null, 2))
                        res.json({POST: "OK"})
                    }
                    catch(err) {
                        console.log("Hubo un error", err);
                    }   
                }
                iniciarJson();
            } 
        } else {
            return res.status(400).send({ error: "parametros incorrectos" });
        }
    }

    async putProduct(req, res) {
        let archivo = this.archivo;
        const objetos = await this.getAll();
        const prodMod = req.body;

        const format = prodMod.name && prodMod.price && prodMod.photo && 
        prodMod.desc && prodMod.code && prodMod.stock && prodMod.pw === "fx88fx" &&
        Object.keys(prodMod).length === 7 ? true : null;

        const prodIndex = objetos.findIndex(elem => elem.id === Number(req.params.id))
        const producto = objetos.find(elem => elem.id === Number(req.params.id));

        if (format && producto) {
            let newProducts = objetos;
            prodMod.id = objetos[prodIndex].id;
            delete prodMod.pw;
            newProducts[prodIndex] = prodMod;
            async function modificar() {
                try { 
                    await fs.promises.writeFile(archivo, JSON.stringify(newProducts, null, 2))
                    return res.send("Producto modificado");
                }
                catch (e) {
                    console.log(e);
                }
            }
            modificar();
        } 
    
        if (!producto) {
            return res.status(404).send({error: "Producto no encontrado"})
        }

        if (!format) {
            res.send({error: "El formato del producto no es correcto"})
        }
    }

    async deleteProduct(req, res) { 
        const pw = req.body.pw;
        //console.log(pw);
        const objetos = await this.getAll();
        const archivo = this.archivo;

        if (pw === "fx88fx") {
            const prodIndex = objetos.findIndex(elem => elem.id === Number(req.params.id));
            
            if (prodIndex < 0) {
                return res.status(404).send({error: "Producto no encontrado"})
            }

            const newProducts = objetos;
            newProducts.splice(prodIndex, 1);
            async function eliminar() {
                try {
                    await fs.promises.writeFile(archivo, JSON.stringify(newProducts, null, 2))
                    return res.send("Producto eliminado");
                }
                catch(e) {
                    console.log(e);
                }
            }
            eliminar();
        } else {
            res.json({Mensaje: "No estás autorizado a acceder a esta ruta"});
        }
    }
}

export default Api;