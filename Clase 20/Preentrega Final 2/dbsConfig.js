import mongoose from "mongoose";

//MONGODB CONFIG
export const db = mongoose.connect("mongodb+srv://Sasha:745431@cluster0.hzrgp.mongodb.net/gente?retryWrites=true&w=majority", 
{ useNewUrlParser: true })

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 25},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    photo: {type: String, required: true},
    code: {type: String, required: true, max: 10},
    desc: {type: String, required: true, max: 100},
})

export const productsModel = mongoose.model("Products", productSchema);

const cartSchema = new mongoose.Schema({
    products: {type: [{
        name: {type: String, required: true, max: 25},
        price: {type: Number, required: true},
        stock: {type: Number, required: true},
        photo: {type: String, required: true},
        code: {type: String, required: true, max: 10},
        desc: {type: String, required: true, max: 100},
    }]}
}, { timestamps: true })

export const cartModel = mongoose.model("Carts", cartSchema);
