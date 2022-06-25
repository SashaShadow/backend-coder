import mongoose from "mongoose";
//import * as model from "./models/estudiante.js";

const URL = 'mongodb://localhost:27017/colegio'

const connection = mongoose.connect(URL, {
  useNewUrlParser: true
})

export default connection;


// CRUD();

// const CRUD = async () => {
//     try {
//         const URL = "mongodb://localhost:27017/colegio"
//         let rta = await mongoose.connect(URL, {
//             useNewUrlParse: true,
//             useUnifiedTopology: true,
//         })
//         console.log("Base de datos conectada");
//     }
//     catch {
//         console.log("No se ha podido conectar")
//     }
// } 

