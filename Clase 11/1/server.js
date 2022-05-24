const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use('/static', express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile("index.html", {root: __dirname});
});

const PORT = 8080;

httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
 })


const mensajes = [];

//vuelve un array de objetos a un array de strings
const stringifier = (array) => {
    return array.map(elem => `${elem.socketid}: ${elem.mensaje}`)
}

io.on("connection", (socket) => {
    console.log("¡Nuevo usuario conectado!");

    //mandar historial de mensajes al nuevo usuario
    socket.emit("historial", stringifier(mensajes))

    socket.on('disconnect', () => {
        console.log('Un usuario se desconectó');
      });

    socket.on('chat message', (msg) => {
        mensajes.push({ socketid: socket.id, mensaje: msg})
        //console.log(mensajes);
        io.sockets.emit('chat message', `${socket.id}: ${msg}`);
      });

});

