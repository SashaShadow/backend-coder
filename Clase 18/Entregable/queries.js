use ecommerce


//1 y 2
const mensajes = [
    {text: "Hola", email: "caballerosasha@hotmail.com"},
    {text: "MIAAAU", email: "elgato@hotmail.com"},
    {text: "QUE?", email: "caballerosasha@hotmail.com"},
    {text: "MEEOOOW", email: "elgato@hotmail.com"},
    {text: "miau", email: "caballerosasha@hotmail.com"},
    {text: "RAUUUUUL", email: "elgato@hotmail.com"},
    {text: "no lo conozco", email: "caballerosasha@hotmail.com"},
    {text: "-", email: "elgato@hotmail.com"},
    {text: "??", email: "caballerosasha@hotmail.com"},
    {text: "...", email: "caballerosasha@hotmail.com"}
]

db.mensajes.insertMany(mensajes)

const productos = [
    {name: "Fahrenheit - Dior", price: 1700, 
    stock: 5, photo: "none", code: "fhtdr", desc: "Perfume clásico del año 1988"},
    {name: "Sauvage - Dior", price: 1280, 
    stock: 5, photo: "none", code: "svgdr", desc: "Perfume clásico de Dior"},
    {name: "Creed Aventus", price: 4990, 
    stock: 5, photo: "none", code: "crdavnts", desc: "Perfume costoso"},
    {name: "Diavolo - Antonio Banderas", price: 150, 
    stock: 5, photo: "none", code: "dvl", desc: "Perfume de los 90"},
    {name: "Invictus - Paco Rabanne", price: 1230, 
    stock: 5, photo: "none", code: "nvcts1", desc: "Perfume dulce"},
    {name: "Mercedes Benz Intense", price: 2300, 
    stock: 5, photo: "none", code: "mbznts", desc: "-"},
    {name: "La Dolfina Stud", price: 120, 
    stock: 5, photo: "none", code: "ldlfn", desc: "Dicen que es un clon de un perfume caro"},
    {name: "Giesso 01", price: 200, 
    stock: 0, photo: "none", code: "gss", desc: "Se parece a Dior Homme Cologne"},
    {name: "Terre D'Hermes", price: 3000, 
    stock: 5, photo: "none", code: "trr1", desc: "Perfume amaderado"},
    {name: "Zara W/End Till 3 AM", price: 1000, 
    stock: 5, photo: "none", code: "zr3am", desc: "Recuerda a Black XS de PR"},
]

db.productos.insertMany(productos)

//3
db.mensajes.find()

//4
db.productos.count()
db.mensajes.count()


//5
//a
db.productos.insertOne({name: "Zara W/End Till 8 PM", price: 1300, 
stock: 5, photo: "none", code: "zr8am", desc: "Recuerda a Invictus"})

//b i
db.productos.find({price: {$lt: 1000}})

//b ii
db.productos.find({ $and: [{price: {$gte: 1000}}, {price: {$lte: 3000}}]}) ver si está bien

//b iii
db.productos.find({price: {$gt: 3000}})

//b iv
db.productos.find({}).sort({price:1}).skip(2).limit(1)

//c
db.productos.updateMany({}, {$set: {stock: 100}})

//d
db.productos.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}})

//e
db.productos.deleteMany({price: {$lt: 1000}})

//6
db.createUser(
    {
        user: "pepe",
        pwd: "asd456",
        roles: [
            { role: "read", db: "ecommerce"}
        ]
    }
)