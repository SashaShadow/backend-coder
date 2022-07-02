const express = require("express");
const { Server: HttpServer } = require("http");

const app = express()
const httpServer = new HttpServer(app);

const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

const randomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

app.get("/test", (req, res) => {
    const objetos = [];
    console.log(req.query.cant)

    for (let i = 0; i < Number(req.query.cant); i++) {
        objetos.push({nombre: randomElement(nombres), apellido: randomElement(apellidos), color: randomElement(colores)})
    }

    res.json({objetos})
})