import express from "express";
import session from 'express-session';
const { Router } = express;
import { Server as HttpServer } from "http";

const app = express()
const httpServer = new HttpServer(app);

const router = Router();

const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", express.static("./public"));
app.set("view engine", "ejs"); 
app.set("views", "./views") 


app.use(session({
    secret: 'fahrenheit',
    resave: true,
    saveUninitialized: true
  }))


const users = [];

router.post('/register', (req, res) => {

    const { username, password } = req.body;

    const found = users.find(elem => elem.username === username);

    if (found) {
        res.json({Error: 'Ese usuario ya existe, elegí otro nombre'})
    } else {
        users.push({username: username, password: password})
        res.send('Registro exitoso')
    }   
})

router.get('/data', (req, res) => {

    if (req.session.username) {
        return res.send(`Nombre de usuario: ${req.session.username}`)
    } else {
        res.send('Debes estar logueado para acceder a tus datos')
    }
})

router.post('/login', (req, res) => {
   
    const { username, password } = req.body

    const found = users.find(elem => {
        return elem.username === username && elem.password === password 
    });

    if (found) {
        req.session.username = username;
        res.redirect('/api/data')
    } else {
        res.json({Error: 'Usuario o contraseña inválidos'})
    }
})


router.get('/logout', (req, res) => {

    return req.session.destroy(err => {
        if (!err) {
            return res.send('Logout successfull')
        }
        return res.send({ error: err })
        }) 
   })

app.use('/api', router);
app.use((req, res, next) => {
    res.status(404).send({error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`});
  });