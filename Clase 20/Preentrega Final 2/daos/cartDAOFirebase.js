import contenedorFirebase from "../contenedores/contenedorFirebase.js";
import { dbFb, queryCart, FieldValue} from "../dbsConfig.js";

class CartDAOFirebase extends contenedorFirebase {
    constructor() {
      super(dbFb, queryCart)
    }

    async getCartProds(req, res) {
      const myId = req.params.id;

      try {
        const doc = await this.collection.doc(`${myId}`)
        const item = await doc.get()
        const response = item.data().products
        return res.json({Productos: response})
        } catch (err){
            console.log(err);
        }
      }
  
      async addToCart(req, res) {
        const productoNuevo = req.body;
        const cartId = req.params.id;

        if (!productoNuevo.id) {
          return res.json({Mensaje: "Todos los productos necesitan una id"})
        }

        try {
          const doc = this.collection.doc(`${cartId}`) 
          await doc.update({
            products: FieldValue.arrayUnion(productoNuevo)
          })
          return res.json({Mensaje: "Producto agregado al carrito"})
        } catch (err){
            console.log(err);
        }
      }
  
      async deleteCartProd(req, res) {
        const cartId = req.params.id;
        const prodId = req.params.id_prod;

        try {
          const doc = this.collection.doc(`${cartId}`) 
          const item = await doc.get()
          const prodToDelete = item.data().products.find(elem => elem.id == prodId);

          if (!prodToDelete) {
            return res.json({Mensaje: "Producto no encontrado en el carrito"})
          }
          
          await doc.update({
            products: FieldValue.arrayRemove(prodToDelete)
          })
          return res.json({Mensaje: "Producto eliminado del carrito"})
        } catch (err){
            console.log(err);
        }
      }
  }

export default CartDAOFirebase;