import { db, msgsModel } from "../dbmodels/dbsConfig.js";
import contenedorMongo from "../contenedores/contenedorMongoDB.js";

const myChat = new contenedorMongo(db, msgsModel);

export const getMsgs = async (req, res) => {
        return res.json(await myChat.getElems(req, res))
     }

export const postMsgs = async (req, res) => {
        return await myChat.postElem(req, res)
     }