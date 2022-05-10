const express = require('express')
const { Router } = express

const app = express()
const router = Router()

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`))

let mascotas = [{nombre: "Nana", raza: "Carey", edad: 1}];
let personas = [{nombre: "Tamunu", apellido: "Acosta", edad: 26}];

router.get('/mascotas', (req, res) => {
   res.send(mascotas)
})

router.post('/mascotas', (req, res) => {

   const pet = req.body.mascota;

   //console.log(pet);

   mascotas.push(pet);

   res.send('post ok')
})

router.get('/personas', (req, res) => {
    res.send(personas)
 })
 
router.post('/personas', (req, res) => {
    res.send('post ok')
 })


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
 
app.use('/api', router)
