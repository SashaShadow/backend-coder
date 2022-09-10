import minimist from "minimist";
import ProductsDAOMongoDB from "../daos/productsDAOMongoDB.js";
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
// let X = null;

class DAOFactory {
    constructor() {
        this.db = myArgs.DAO || 'mongo';
    }

    getProdDAO() {
        // ESTE SEGMENTO COMENTADO LO UTILICÉ PARA PROBAR QUE SOLO SE CREA UNA INSTANCIA DEVOLVIENDO UN NUMERO RANDOM.
        // if (!X) {                
        //     X = Math.random();
        // }
        // return X;
        if (!prodInstance) {
            if (this.db === 'mongo') {
                prodInstance = new ProductsDAOMongoDB();
            } //else if (this.db === 'mariadb') { prodInstance = new ProductosDAOMariaDB || 'ProductosDAOMariaDB' } //sin implementar, a modo de ejemplo 
        }
        return prodInstance
    }

    getCartDAO() {
        if (!cartInstance) {
            if (this.db === 'mongo') {
                cartInstance = new cartsDAOMongoDB();
            } //else if (this.db === 'mariadb') { cartInstance = new cartsDAOMariaDB || 'cartsDAOMariaDB' } //sin implementar, a modo de ejemplo  
        }
        return cartInstance;
    }

    getMsgDAO() {
        if (!msgInstance) {
            if (this.db === 'mongo') {
                msgInstance = new MessageDAOMongoDB();
            } //else if (this.db === 'mariadb') { msgInstance = new MessageDAOMariaDB || 'MessageDAOMariaDB' } //sin implementar, a modo de ejemplo  
        } 
        return msgInstance;
    }

    getOrderDAO() {
        if (!orderInstance) {
            if (this.db === 'mongo') {
                orderInstance = new OrderDAOMongoDB();
            } //else if (this.db === 'mariadb') { orderInstance = new OrderDAOMariaDB || 'OrderDAOMariaDB' } //sin implementar, a modo de ejemplo 
        }
        return orderInstance  
    }

}

export default DAOFactory;