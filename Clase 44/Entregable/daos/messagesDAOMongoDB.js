import contenedorMongo from "../contenedores/contenedorMongoDB.js";
import { db, msgsModel } from "../dbmodels/dbsConfig.js";

class MessageDAOMongoDB extends contenedorMongo {
    constructor() {
        super(db, msgsModel);
    }
} 

export default MessageDAOMongoDB;
