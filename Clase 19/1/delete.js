import db from "./index.js";
import {estudianteModel} from "./models/estudiante.js";


db
.then(_ => estudianteModel.deleteOne({nombre: "Lucas"}))
.then(res => console.log(res))
.catch(err => console.log("Hubo un error", err))
.finally(() => process.exit())