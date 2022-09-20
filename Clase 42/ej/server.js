import express from "express";
import axios from 'axios';
import got from 'got';

const app = express()
const { Router } = express;
const router = Router();
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
  })
server.on("error", error => console.log(`Error en servidor ${error}`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const numbers = [];
const noAleatorio = () => {
    return Math.floor(Math.random() * 100)
};
router.get('/egreso', (req, res) => {
    res.json(numbers)
})
router.post('/ingreso', (req, res) => {
    const number = req.body.number;
    numbers.push(number);
})
setInterval(() => {
    axios.post('http://localhost:8080/ingreso', {
    number: noAleatorio()
    })
}, 2000)
setInterval(async () => {
    try {
        const response = await got('http://localhost:8080/egreso')
        console.log(response.body)
    }
    catch(err) {
        console.log(err)
    }  
}, 5000)
app.use('', router);

