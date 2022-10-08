import contenedorMongoDB from "../contenedores/contenedorMongoDB.js";
import { db, productsTestModel} from "../dbmodels/dbsConfig.js";

class ProductsTestDAOMongoDB extends contenedorMongoDB {
    constructor() {
      super(db, productsTestModel)
    }
  }

export default ProductsTestDAOMongoDB;