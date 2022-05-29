const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use('/static', express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile("/public/index.html", {root: __dirname});
});

const PORT = 8080;

httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
 })

const mensajes = [
    {author: "Juan", text: "XD"},
    {author: "Matias", text: "XDDDD"},
    {author: "Maria", text: "XDssd"},
];

io.on("connection", socket => {
    console.log("Un cliente se ha conectado");
    socket.emit("Mensajes", mensajes);

    socket.on("new-message", data => {
        mensajes.push(data);
        io.sockets.emit("Mensajes", mensajes)
    })
})