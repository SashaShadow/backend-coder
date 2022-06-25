import mongoose from "mongoose";

const db = mongoose.connect("mongodb+srv://Sasha:745431@cluster0.hzrgp.mongodb.net/?retryWrites=true&w=majority", 
{ useNewUrlParser: true })



db
.then(_ => {
    const gente = db.collection("gente");
    return gente}
    )
    .then(data => data.find())
.then(res => console.log(res))
.catch(err => console.log("Hubo un error", err))
.finally(() => process.exit())