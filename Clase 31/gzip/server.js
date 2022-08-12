import express from "express";
import minimist from "minimist";
import compression from 'compression'
import "dotenv/config.js";

const options = {
    alias: {
      p: 'PORT',
    }
  }
  
const myArgs = minimist(process.argv.slice(2), options)
const app = express()

const PORT = myArgs.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`));

const frase = 'Hola que taaal';

app.get('/saludo', (req, res) => {

    let mensaje = '';

    for (let i = 0; i < 1000; i++) {
        mensaje += frase;
    }

    res.send(mensaje)

})

app.get('/saludozip', compression(), (req, res) => {

    let mensaje = '';

    for (let i = 0; i < 1000; i++) {
        mensaje += frase;
    }

    res.send(mensaje)

})