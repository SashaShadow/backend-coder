import contenedorMongoDB from "./contenedorMongoDB.js";
import { db, cartModel} from "./dbsConfig.js";

class CartDAOMongoDB extends contenedorMongoDB {
    constructor() {
      super(db, cartModel)
    }

    async getCartProds(req, res) {
      return this.db
        .then(_ => this.model.findOne({_id: req.params.id}))
        .then(data => {
            return res.json({Productos: [data.products]})
        })
        .catch(err => {res.send(err); throw err})
    }

    async getCarts(req, res) {
      return this.db
      .then(_ => this.model.findOne({owner: req.params.id}))
      .then(data => {
        return data;
      })
      .catch(err => {res.send(err); throw err})
    }

    async addToCart(req, res) {
      const productoNuevo = req.body;

      return this.db
        .then(_ => this.model.findOne({owner: req.params.id})) 
        .then(data => { 
            if (data) {
              const found = data.products.find(product => product.code === productoNuevo.code);
              if (found) {
                found.quantity += productoNuevo.quantity;  
                data.save();
              } else {
                data.products.push(productoNuevo)
                data.save();
              }
            } else {
              const newCart = new this.model();
              newCart.owner = req.params.id;
              newCart.products.push(productoNuevo);
              return this.db.then(_ => newCart.save())
            }
        })
        .then(_=> {
          res.json({Mensaje: "Producto agregado al carrito"})
        })
        .catch(err => {res.send(err); throw err})
    }

    async deleteCartProd(req, res) {
      return this.db
        .then(_ => this.model.findOne({owner: req.params.id}))
        .then(cart=> {
           cart.products.id(req.params.id_prod).remove()
           cart.save();
        })
        .then(_ => res.json({Mensaje: "Producto eliminado del carrito"}))
        .catch(err => res.send("No se encontró el producto con dicha id"))
    }
  }

export default CartDAOMongoDB;