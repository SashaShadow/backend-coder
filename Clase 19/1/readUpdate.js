import db from "./index.js";
import {estudianteModel} from "./models/estudiante.js";


db
.then(_ => estudianteModel.findOne({nombre: "Ana"}))
.then(user => {
    console.log(user)
    user.nombre = "Anahi"
    user.save()
    console.log(user);
})
.catch(err => console.log("Hubo un error", err))
.finally(() => process.exit())