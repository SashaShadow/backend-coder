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
let personas = [{nombre: "Juan", apellido: "Perez", edad: 26}];

router.get('/mascotas', (req, res) => {
   res.send(mascotas)
})

router.post('/mascotas', (req, res) => {

   const pet = req.body;

   if (pet.nombre && pet.raza && pet.edad) {
      mascotas.push(pet);
      res.send(mascotas);
    } else {
      return res.status(400).send({ error: "parametros incorrectos" });
    }

})

router.get('/personas', (req, res) => {
    res.send(personas)
 })
 
router.post('/personas', (req, res) => {

   const persona = req.body.persona;
   personas.push(persona);
   res.send('post ok')
 })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(__dirname + "/public"));
 
app.use('/api', router)
