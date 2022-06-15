import express from "express";
const { Router } = express;
import Api from "./apiFunc.js";
import Chat from "./ChatFunc.js";
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import {sqliteOptions} from "./sqlite.js";
import {mariaOptions} from "./mariaDb.js";
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
app.use("/api", express.static("./public"));
app.set("view engine", "ejs"); 
app.set("views", "./views") 
app.use(cors());

const myApi = new Api("fragancias", mariaOptions); 
const myChat = new Chat("mensajes", sqliteOptions);

io.on("connection", async socket => { 
    console.log("Un nuevo cliente se ha conectado");
    socket.emit("Productos", await myApi.getAll());
    socket.emit("Mensajes", await myChat.getAll());

    socket.on("new-message", async data => { 
        data.time = new Date().toLocaleString();
        io.sockets.emit("MensajeIndividual", data)
    })

    socket.on("nuevo-producto", async data => {
        const prods = await myApi.getAll();
        data.id = prods[prods.length - 1].id + 1;
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

//RUTAS MENSAJES CHAT
router.get('/mensajes', async (req, res) => {
    return await myChat.getMsgs(req, res)
 })

router.post('/mensajes', async (req, res) => {
    return await myChat.postMsg(req, res)
 })

router.get("/", (req, res) => {
    res.render("pages/index.ejs");
});

app.use('/api', router);
app.use((req, res, next) => {
    res.status(404).send({error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`});
  });