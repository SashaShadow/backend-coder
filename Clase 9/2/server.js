const express = require('express');
const { Router } = express
const fs = require("fs");

const app = express()
const router = Router()

app.engine("cte", (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            return callback(new Error(err));
        }
        const rendered = content.toString()
        .replace("^^titulo$$", ''+ options.titulo +'')
        .replace("^^mensaje$$", ''+ options.mensaje +'')
        .replace("^^autor$$", ''+ options.autor +'')
        .replace("^^version$$", ''+ options.version +'')
        .replace("^^nombre$$", ''+ options.nombre +'')
        .replace("^^apellido$$", ''+ options.apellido +'')
        .replace("^^fyh$$", ''+ options.fyh +'');

        return callback(null, rendered);
    })
})

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", "./views");
app.set("view engine", "cte");

app.get("/", (req, res) => {
    res.render("index", { titulo: "Pragmatismo", mensaje: "Nada", autor: "William James", version: 1,});
})

const myObj = {
    nombre: "Sasha",
    apellido: "R. Carlomagno",
    fyh: Date.now(),
}

app.get("/cte2", (req, res) => {
    res.render("plantilla2", {
        nombre: "Sasha",
        apellido: "R. Carlomagno",
        fyh: Date.now(),
    });
})