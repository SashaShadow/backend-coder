import express from 'express';
const app = express()

import minimist from "minimist";

const options = {
    alias: {
      p: 'PORT',
      m: 'MODO'
    }
  }
  
const myArgs = minimist(process.argv.slice(2), options)

const PORT = myArgs.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`));


app.get('/', (req, res) => {
    res.json({puerto: PORT})
})