const express = require('express');
const multer = require("multer");
const { Router } = express

const app = express()
const router = Router()

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));

let productos = [
    {
        title: "Fender Stratocaster",
        price: 150000,
        thumbnail: null,
        id: 1,
    }
];

router.get('/productos', (req, res) => {
    res.json({productos})
 })

router.get('/productos/:id', (req, res) => {

    const producto = productos.find(elem => elem.id === Number(req.params.id))

    if (producto) {
        res.json({producto})
    } else {
        res.status(404).json({error: "Producto no encontrado"})
    }
 })

router.post('/productos', (req, res) => {

    const productoNuevo = req.body;

    if (productoNuevo.title && productoNuevo.price && productoNuevo.thumbnail && Object.keys(productoNuevo).length === 3) {
        longitud = productos.length;
        longitud ? productoNuevo.id = productos[longitud - 1].id + 1 : productoNuevo.id = 1 ;
        productos.push(productoNuevo);
        res.json(productos);
      } else {
        return res.status(400).send({ error: "parametros incorrectos" });
      }
 })

router.put("/productos/:id", (req, res) => {
    const prodMod = req.body.producto;

    const format = prodMod.hasOwnProperty("title") && 
    prodMod.hasOwnProperty("price") && 
    prodMod.hasOwnProperty("thumbnail") && 
    Object.keys(prodMod).length === 3 ? true : null;

    const prodIndex = productos.findIndex(elem => elem.id === Number(req.params.id))

    const producto = productos.find(elem => elem.id === Number(req.params.id));

    if (format && producto) {
        prodMod.id = productos[prodIndex].id;
        productos[prodIndex] = prodMod;
        return res.send("Producto modificado");
    } 
    
    if (!producto) {
        return res.status(404).send({error: "Producto no encontrado"})
    }

    if (!format) {
        res.send({error: "El formato del producto no es correcto (debe tener un title, un price y un thumbnail"})
    }
})

router.delete("/productos/:id", (req, res) => {
    const prodIndex = productos.findIndex(elem => elem.id === Number(req.params.id));

    if (!prodIndex) {
        return res.status(404).send({error: "Producto no encontrado"})
    }

    productos.splice(prodIndex, 1);
    res.send("Producto eliminado");
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.use('/api', router)