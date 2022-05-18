const express = require('express');
const { Router } = express

const app = express()
const router = Router()

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "pug");
app.set("views", "./views")

app.use('/static', express.static(__dirname + '/public'));

router.get("/", (req, res) => {
    res.render("hello", { title: "Hola perro"});
});

router.get("/datos", (req, res) => {
    const min = req.query.min;
    const nivel = req.query.nivel;
    const max = req.query.max;
    const title = req.query.title;

    console.log(req.query);

    res.render("datos", {min: min, nivel: nivel, max: max, title: title})
});

app.use('/pug', router);

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));
