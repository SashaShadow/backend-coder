import ProductsDAOMongoDB from "./productsDAOMongoDB.js";
import ProductsDAOFirebase from "./productsDAOFirebase.js";
import CartDAOMongoDB from "./cartDAOMongoDB.js";
import CartDAOFirebase from "./cartDAOFirebase.js";

const getStorage = () => {
    const storage = process.env.STORAGE || 'mongodb'
    switch (storage) {
      case 'mongodb':
        return {
          products: new ProductsDAOMongoDB(),
          cart: new CartDAOMongoDB()
        }
        break
      case 'firebase':
        return {
          products: new ProductsDAOFirebase(),
          cart: new CartDAOFirebase()
        }
        break
      default:
        return {
          products: new ProductsDAOMongoDB(),
          cart: new CartDAOMongoDB()
        }
        break
    }
  }

  export default getStorage;
