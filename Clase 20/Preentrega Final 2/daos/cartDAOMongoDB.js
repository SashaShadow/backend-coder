import contenedorMongoDB from "../contenedores/contenedorMongoDB.js";
import { db, cartModel} from "../dbsConfig.js";

class ProductsDAOMongoDB extends contenedorMongoDB {
    constructor() {
      super(db, cartModel)
    }
  }

export default ProductsDAOMongoDB;