import mongoose from "mongoose";

const db = mongoose.connect("mongodb+srv://Sasha:745431@cluster0.hzrgp.mongodb.net/gente?retryWrites=true&w=majority", 
{ useNewUrlParser: true })


const peopleSchema = new mongoose.Schema({
    nombre: {type: String},
    apellido: {type: String},
    dni: {type: String},
}, { collection: 'gente' })

export const peopleModel = mongoose.model("gente", peopleSchema);


db
.then(_ => peopleModel.find({}))
.then(res => console.log(res))
.catch(err => console.log("Hubo un error", err))
.finally(() => process.exit())


//update cli  db.gente.updateOne({nombre: "Marcos"}, {$set: {nombre: "Marco"}})