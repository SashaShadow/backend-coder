const express = require('express');

const app = express()

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`))

app.use(express.urlencoded({ extended: true }));

app.get("/api/sumar/:num1/:num2", (req, res) => {
    const resultado = Number(req.params.num1) + Number(req.params.num2);
    res.send({resultado});
})

app.get("/api/sumar", (req, res) => {
    const resultado = Number(req.query.num1) + Number(req.query.num2);
    res.send({resultado});
})

app.get("/api/operacion/:numeros", (req, res) => {
    console.log(req.params.numeros);
    const numeros = req.params.numeros.split("+");
    res.send({resultado: Number(numeros[0]) + Number(numeros[1])});
})

app.post("/api", (req, res) => {
    console.log("Ok, POST request recibido");
    res.send("Ok, POST request recibido");
})

app.put("/api", (req, res) => {
    console.log("Ok, PUT request recibido");
    res.send("Ok, PUT request recibido");
})

app.delete("/api", (req, res) => {
    console.log("Ok, DELETE request recibido");
    res.send("Ok, DELETE request recibido");
})