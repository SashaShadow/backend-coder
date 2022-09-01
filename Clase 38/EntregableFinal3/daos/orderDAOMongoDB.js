import contenedorMongoDB from "../contenedores/contenedorMongoDB.js";
import { db, Order } from "../dbmodels/dbsConfig.js";

class OrderDAOMongoDB extends contenedorMongoDB {
    constructor() {
      super(db, Order)
    }

    async getOrders() {
      return this.db
        .then(_ => this.model.findAll())
        .then(data => {
            return data;
        })
    }

    async createOrder(orderData) {
        const newOrder = new this.model(orderData);
        return this.db
        .then(_ => newOrder.save())
    }
  }

export default OrderDAOMongoDB;