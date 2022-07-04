import contenedorFirebase from "../contenedores/contenedorFirebase.js";
import { dbFb, queryProds} from "../dbsConfig.js";

class ProductsDAOFirebase extends contenedorFirebase {
    constructor() {
      super(dbFb, queryProds)
    }
  }

export default ProductsDAOFirebase;