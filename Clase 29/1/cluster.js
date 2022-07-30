import cluster from 'cluster';
import http from 'http';
import os from 'os';

const numCpus = os.cpus().length


if (cluster.isPrimary) {
    console.log(`El master con pid numero ${process.pid} esta funcionando`);


    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }


    cluster.on('exit', (worker, code, signal) => {
        console.log(`el worker ${worker.process.pid} murió`)
    });

} else {

    http.createServer((req, res) => {
        res.writeHead(200)
        res.end('Hello world\n')
    }).listen(8000)

    console.log(`El worker ${process.pid} empezó`)
}