import express from "express";

const app = express();

const PORT = parseInt(process.argv[2]) || 8080;

app.get('/datos', (req, res) => {
    console.log(`PORT: ${PORT} fyh: ${Date.now()}`)
    res.send(`Servidor express NGINX en ${PORT} - PID: ${process.pid} - FYH: ${new Date().toLocaleString()}`)
}) 

app.listen(PORT, err => {
    if (!err) console.log(`Servidor escuchando en ${PORT} - PID: ${process.pid}`)
})