import express, { Router } from 'express';
import minimist from 'minimist';

const app = express();
const router = Router();


const options = {
    alias: {
      p: 'PORT'
    }
  }

const myArgs = minimist(process.argv.slice(2), options)

console.log(myArgs);

const PORT = myArgs.PORT || 8080;  

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));


console.log(`Puerto de conexión: ${PORT}
ID del proceso: ${process.pid}`)


app.get('/', (req, res) => {
    res.json({mensaje: `Servidor express en (PORT: ${PORT}) - PID: (${process.pid}) - (${Date().toLocaleString()})}`})
})