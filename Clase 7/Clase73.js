const express = require('express');

const app = express()

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let frase = "Esta es mi frase";
const frasediv = frase.split(" ");


app.get('/api/frase', (req, res) => {
    res.json({frase});
})

app.get("/api/palabras/:pos", (req, res) => {
    if (isNaN(req.params.pos)) {
        res.send({error: "El parametro ingresado no es un numero"});
    } else if (Number(req.params.pos) < 1 || Number(req.params.pos) > frasediv.length) {
        res.send({error: "Numero ingresado fuera de rango"});
    } else {
        res.send(frasediv[Number(req.params.pos) - 1])
    }
})

app.post("/api/palabras", (req, res) => {   
    console.log(req.body);
    const palabra = req.body.palabra;
    frase += ` ${palabra}`;
    const posicion = frase.split(" ").length;

    res.send({ agregada: palabra, pos: posicion,})
})

app.put("/api/palabras/:pos", (req, res) => {
    const palabraNueva = req.body.palabra;
    const oracion = frase.split(" "); //array con las palabras
    const palabraVieja = frase.split(" ")[Number(req.params.pos) - 1];
    oracion[Number(req.params.pos) - 1] = palabraNueva; //reemplazar palabra nueva en el lugar indicado
    frase = oracion.join(" "); //actualizar frase con el array convertido en string

    res.send({
        result: "Ok",
        id: req.params.pos,
        anterior: palabraVieja,
        actualizada: palabraNueva,
    })
})

app.delete("/api/palabras/:pos", (req, res) => {
    const posiciónAEliminar = Number(req.params.pos) - 1;
    const oracionNueva = frase.split(" "); //array de oraciones
    const palabraEliminada = oracionNueva[posiciónAEliminar];
    oracionNueva.splice(posiciónAEliminar, 1);

    frase = oracionNueva.join(" ");

    res.send({
        result: "Ok",
        palabraEliminada: palabraEliminada,
    })
})