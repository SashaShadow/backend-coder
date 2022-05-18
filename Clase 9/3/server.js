const express = require('express');
const handlebars = require("express-handlebars");
const { engine } = require('express-handlebars');
const path = require ('path');

const app = express()

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir:  __dirname + "/views/partials"
}))

const viewsPath = path.join(__dirname, './views') 

app.set("view engine", "hbs");
app.set("views", "./views")

const myApi = [ 
    {dataName:"Nombre", data: "Sasha"},
    {dataName:"Apellido", data: "R. Carlomagno"},
    {dataName:"Telefono", data: 1130931945},
    {dataName:"Email", data: "caballerosasha@hotmail.com"}
]

app.use('/static', express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.render("main", { myData: myApi, listExists: true});
});

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));
