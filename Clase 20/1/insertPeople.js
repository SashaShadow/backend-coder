import mongoose from "mongoose";
import {peopleModel} from "./selectPeople.js";

const db = mongoose.connect("mongodb+srv://Sasha:745431@cluster0.hzrgp.mongodb.net/gente?retryWrites=true&w=majority", 
{ useNewUrlParser: true })

db
.then(_ => peopleModel.insertMany([
    {nombre: "Federico", apellido: "Perez", dni: "32002001"},
    {nombre: "Federica", apellido: "Pereza", dni: "32003001"}
]))
.then(res => console.log(res))
.catch(err => console.log("Hubo un error", err))
.finally(() => process.exit())