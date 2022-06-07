import express from "express";
const { Router } = express;
import Api from "./apiFunc.js";
import Cart from "./Cart.js";
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import cors from "cors";

const app = express()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const router = Router();

const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.use(cors());

const myApi = new Api("productos.json"); 
const myCart = new Cart("carrito.json");

io.on("connection", async socket => { 
    
    console.log("Un nuevo cliente se ha conectado");
    socket.emit("Productos", await myApi.getProducts());

    socket.on("nuevo-producto", data => {
        //el posteo se tiene que hacer con una post request y fetch
        io.sockets.emit("ProductoIndividual", data)
    })
})

//CRUD PRODUCTOS
router.get('/productos/:id', (req, res) => {
    return myApi.getProduct(req, res)
 })

router.get('/productos', async (req, res) => {
    return await myApi.getProducts(req, res)
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

//CRUD CARRITO
router.get('/carrito/:id/productos', (req, res) => {
    return myCart.getCartProducts(req, res)
 })

router.post('/carrito/', async (req, res) => {
    return await myCart.newCart(req, res)
 })

router.get('/carrito/', (req, res) => {
    return myCart.getCart(req, res)
 })

router.post('/carrito/:id/productos', (req, res) => {
    return myCart.postProduct(req, res)
 })

router.delete("/carrito/:id", (req, res) => {
    return myCart.deleteCart(req, res)
})

router.delete("/carrito/:id/productos/:id_prod", (req, res) => {
    return myCart.deleteCartProduct(req, res)
})

// router.get("/", (req, res) => {
//     res.render("pages/index", { productos: productos});
// });

app.use('/api', router);
app.use((req, res, next) => {
    res.status(404).send({error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`});
  });