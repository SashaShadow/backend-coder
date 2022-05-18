const express = require('express');
const { Router } = express;
const Api = require("../apiFunc.js");
const handlebars = require("express-handlebars");

const app = express()
const router = Router()

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "hbs"); 
app.set("views", "./views") 

app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
})
);

let productos = [
    {
        title: "Fender Stratocaster",
        price: 150000,
        thumbnail: "ninguno",
        id: 1,
    }, 
];

const myApi = new Api(productos);

router.get('/productos', (req, res) => {
    res.render("productos", { productos: productos }) 
 })

router.get('/productos/:id', (req, res) => {
    return myApi.getProduct(req, res)
 })

router.post('/productos', (req, res) => {
    return myApi.postProduct(req, res)
 })

router.put("/productos/:id", (req, res) => {
    return myApi.putProduct(req, res)
})

router.delete("/productos/:id", (req, res) => {
    return myApi.deleteProduct(req, res)
})

router.get("/", (req, res) => {
    res.render("main", { productos: productos }) 
});

app.use(express.static("public"));
app.use('/api', router);