import mongoose from "mongoose";
import "dotenv/config.js";

//MONGODB CONFIG
export const db = mongoose.connect(process.env.MONGODB, 
{ useNewUrlParser: true })

const chatSchema = new mongoose.Schema({
    author: {type: Object, required: true },
    text: {type: String, required: true},
    time: {type: String, required: true}
}, {
    versionKey: false 
})

export const msgsModel = mongoose.model("Msgs", chatSchema);

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
        quantity: {type: Number, required: true}
    }]},
    owner: {type: String, required: true},
}, { timestamps: true })

export const cartModel = mongoose.model("Carts", cartSchema);

const orderSchema = new mongoose.Schema({
    client: {type: {
        username: {type: String, required: true, max: 30},
        email: {type: String, required: true},
        name: {type: String, required: true},
        phone: {type: Number, required: true}, 
        address: {type: String, required: true, max: 40},
    }},
    order: {type: {
        products: {type: Array, required: true},
        total: {type: Number, required: true},
        orderNo: {type: String, required: true}
    }},
    owner: {type: String, required: true}
})

export const Order = mongoose.model("Order", orderSchema);

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, max: 30},
    password: {type: String, required: true, max: 20},
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    age: {type: Number, required:true, max: 99},
    address: {type: String, required: true, max: 40},
    phone: {type: Number, required: true, unique: true}, 
    photo: {type: String, required: true},
    admin: {type: Boolean}
})

export const User = mongoose.model('Users', userSchema);
