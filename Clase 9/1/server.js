const express = require('express');
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

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});