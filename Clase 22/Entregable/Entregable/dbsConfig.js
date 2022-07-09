import mongoose from "mongoose";

//MONGODB CONFIG
export const db = mongoose.connect("mongodb+srv://Sasha:745431@cluster0.hzrgp.mongodb.net/Store?retryWrites=true&w=majority", 
{ useNewUrlParser: true })

const chatSchema = new mongoose.Schema({
    author: { type: Object, required: true },
    text: {type: String, required: true, max: 100}
}, { timestamps: true })

export const msgsModel = mongoose.model("Msgs", chatSchema);


// id: {type: String, required: true, max: 25},
// nombre: {type: String, required: true, max: 20},
// apellido: {type: String, required: true},
// edad: {type: Number, required: true, max: 100},
// alias: {type: String, required: true, max: 100},
// avatar: {type: String, required: true, max: 10},
// },