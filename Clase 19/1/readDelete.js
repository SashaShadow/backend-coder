import db from "./index.js";
import {estudianteModel} from "./models/estudiante.js";


db
.then(_ => estudianteModel.findOne({nombre: "Ana"}))
.then(user => {
    console.log(user)
    return user.remove()
})
.then(console.log())
.catch(err => console.log("Hubo un error", err))
.finally(() => process.exit())