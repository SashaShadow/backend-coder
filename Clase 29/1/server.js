import express, { Router } from 'express';
import minimist from 'minimist';
import cluster from 'cluster';
import http from 'http';
import os from 'os';
const numCpus = os.cpus().length


const app = express();

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

if (cluster.isPrimary) {
    console.log(`El master con pid numero ${process.pid} esta funcionando`);


    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }


    cluster.on('exit', (worker, code, signal) => {
        console.log(`el worker ${worker.process.pid} murió`)
        if (!code) {
            cluster.fork(); //para reiniciarlo si se muere uno por razones que no tengan que ver con el propio servidor (sin codigo de salida)
        }
    });

} else {

    http.createServer((req, res) => {
        res.writeHead(200)
        res.end('Hello world\n')
    }).listen(8081)

    console.log(`El worker ${process.pid} empezó`)
}



app.get('/', (req, res) => {
    res.json({mensaje: `Servidor express en (PORT: ${PORT}) - PID: (${process.pid}) - (${Date().toLocaleString()})}`})
})