import contenedorMongoDB from "../contenedores/contenedorMongoDB.js";
import { db, productsModel} from "../dbmodels/dbsConfig.js";

class ProductsDAOMongoDB extends contenedorMongoDB {
    constructor() {
      super(db, productsModel)
    }
  }

export default ProductsDAOMongoDB;