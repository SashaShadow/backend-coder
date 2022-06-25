import db from "./index.js";
import {estudianteModel} from "./models/estudiante.js";


db
.then(_ => estudianteModel.updateOne({edad: 21}, {$set: {edad: 42}}))
.then(res => console.log("Cambios guardados"))
.catch(err => console.log("Hubo un error", err))
.finally(() => process.exit())