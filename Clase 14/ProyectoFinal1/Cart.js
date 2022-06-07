import fs from "fs";

class Cart {
    constructor(archivo) {
        this.archivo = archivo;
    }

    //ARRAY response of carts
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

    //JSON response of carts
    async getCart(req, res) {
        try{
            const data = await fs.promises.readFile(this.archivo, "utf-8")
            const objetos = data ? (JSON.parse(data)) : []
            res.json({Carritos: objetos});
        } 
        catch(err) {
            console.log(err)
        }
    }

    async getCartProducts(req, res) {
        const objetos = await this.getAll();
        const carrito = objetos.find(elem => elem.id === Number(req.params.id))
        if (carrito) {
            res.json({cartProducts: carrito.productos })
        } else {
            res.status(404).json({error: "Carrito no encontrado"})
        }
    }

    async newCart(req, res) {
        let archivo = this.archivo;
        const data = await this.getAll();
        if (data.length) {
            let newId = data[data.length - 1].id + 1;
            let newCart = data;
            newCart.push({id: newId, timestamp: Date.now(), productos: []});
            console.log(newCart);
            async function addCart() {
                try {
                    await fs.promises.writeFile(archivo, JSON.stringify(newCart, null, 2))
                    res.json({Mensaje: `El carrito ya fue creado, agregá productos al mismo, su id es ${newId}` })
                }
                catch(e) {
                    console.log(e);
                }
            }
            addCart();
        } else {
            let cart = [{id: 1, timestamp: Date.now(), productos: []}];
            async function iniciarJson() {
                try {
                    await fs.promises.writeFile(archivo, JSON.stringify(cart, null, 2))
                    res.json({Mensaje: `El carrito ya fue creado, agregá productos al mismo, su id es 1`})
                }
                catch(e) {
                    console.log(e);
                }
            }
            iniciarJson(); 
        }
    }

    async postProduct(req, res) {
        const productoNuevo = req.body;
        const cartId = Number(req.params.id);
        let archivo = this.archivo;

        if (productoNuevo.name && productoNuevo.price && productoNuevo.photo && 
            productoNuevo.desc && productoNuevo.code && productoNuevo.stock && productoNuevo.id && Object.keys(productoNuevo).length === 7) {
            const carritos = await this.getAll();
            if (carritos.length) {
                const cart = carritos.find(elem => elem.id === cartId);
                if (cart) {
                    cart.productos.push(productoNuevo);
                    async function agregar() {
                        try {
                            let contenidoNuevo = carritos; 
                            console.log(contenidoNuevo);
                            contenidoNuevo.forEach((elem, index) => elem.id === cart.id ? contenidoNuevo[index] = cart : null);
                            await fs.promises.writeFile(archivo, JSON.stringify(contenidoNuevo, null, 2));
                            res.json({Mensaje: "Producto agregado al carrito"});
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    agregar();
                } else {
                    res.status(400).send({error: "No se ha encontrado dicho carrito"});
                } 
            }
        } else {
            return res.status(400).send({ error: "Parametros incorrectos" });
        }
    }

    async deleteCart(req, res) {
        const archivo = this.archivo;
        const objetos = await this.getAll();
        const cartIndex = objetos.findIndex(elem => elem.id === Number(req.params.id));

        if (cartIndex < 0) {
            return res.status(404).send({error: "Carrito no encontrado"})
        }

        try {
            let contenidoNuevo = objetos;
            contenidoNuevo.splice(cartIndex, 1);
            await fs.promises.writeFile(archivo, JSON.stringify(contenidoNuevo, null, 2));
            res.json({Mensaje: "Carrito eliminado"});
        }
        catch(e) {
            console.log(e);
        }

        // objetos.splice(cartIndex, 1);
        // res.json({Mensaje: "Carrito eliminado"});
    }

    async deleteCartProduct(req, res) {
        const archivo = this.archivo;
        const objetos = await this.getAll();
        const cartIndex = objetos.findIndex(elem => elem.id === Number(req.params.id));
        const prodIndex = objetos[cartIndex].productos.findIndex(elem => elem.id === Number(req.params.id_prod));

        if (cartIndex < 0) {
            return res.status(404).send({error: "Carrito no encontrado"})
        } else if (prodIndex < 0) { 
            return res.status(404).json({error: "Producto no encontrado en el carrito"});
        }

        try {
            let contenidoNuevo = objetos;
            contenidoNuevo[cartIndex].productos.splice(prodIndex, 1);
            await fs.promises.writeFile(archivo, JSON.stringify(contenidoNuevo, null, 2));
            res.json({Mensaje: "Producto eliminado del carrito"});
        }
        catch(e) {
            console.log(e);
        }
    }

}

export default Cart;