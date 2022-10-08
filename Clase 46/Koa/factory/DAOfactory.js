import minimist from "minimist";
import ProductsDAOMongoDB from "../daos/productsDAOMongoDB.js";
import ProductsTestDAOMongoDB from "../daos/productsTestDAOMongoDB.js";
import cartsDAOMongoDB from "../daos/cartsDAOMongoDB.js";
import OrderDAOMongoDB from "../daos/orderDAOMongoDB.js"
import MessageDAOMongoDB from "../daos/messagesDAOMongoDB.js";

const options = {
    alias: {
      d: 'DAO'
    }
  }

const myArgs = minimist(process.argv.slice(2), options)

let prodInstance = null;
let msgInstance = null;
let orderInstance = null;
let cartInstance = null;

class DAOFactory {
    constructor() {
        this.db = myArgs.DAO || 'mongo';
    }

    getProdDAO() {
        if (!prodInstance) {
            if (this.db === 'mongo') {
                prodInstance = new ProductsDAOMongoDB();
            } else if (this.db === 'test') {
                prodInstance = new ProductsTestDAOMongoDB();
            } 
        }
        return prodInstance
    }

    getCartDAO() {
        if (!cartInstance) {
            if (this.db === 'mongo') {
                cartInstance = new cartsDAOMongoDB();
            } 
        }
        return cartInstance;
    }

    getMsgDAO() {
        if (!msgInstance) {
            if (this.db === 'mongo') {
                msgInstance = new MessageDAOMongoDB();
            }  
        } 
        return msgInstance;
    }

    getOrderDAO() {
        if (!orderInstance) {
            if (this.db === 'mongo') {
                orderInstance = new OrderDAOMongoDB();
            }  
        }
        return orderInstance  
    }

}

export default DAOFactory;