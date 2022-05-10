const express = require('express');
const moment = require('moment');

moment.locale("es");

const app = express()

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.send("<h1 style='color:blue;'>Bienvenidos al servidor express</h1>")
 })

 let counter = 0;

app.get('/visitas', (req, res) => { 
    counter += 1;
    res.send(`Numero de visitas a esta pagina: ${counter}`)
 })

app.get('/fyh', (req, res) => {
    const date = moment().format("MMMM Do YYYY, h:mm:ss a");
    res.send({ fyh: date })
 })
 
 