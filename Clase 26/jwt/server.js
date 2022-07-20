import express from 'express';
const { Router } = express;
import { Server as HttpServer } from "http";
import flash from 'connect-flash';
import jwt from 'jsonwebtoken';
const PRIVATE_KEY = 'fahrenheit77'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const httpServer = new HttpServer(app);

const router = Router();

const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(session({
  secret: 'qwerty',
  resave: true,
  saveUninitialized: true
}))

app.use(flash())
app.set('view engine', 'ejs')

const usuarios = []

const generateToken = (user) => {
    const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: '24h' });
    return token;
  }

function auth(req, res, next) {
    const authHeader = req.headers.authorization;
   
    if (!authHeader) {
      return res.status(401).json({
        error: 'not authenticated'
      });
    }
   
    const token = authHeader.split(' ')[1];
   
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          error: 'not authorized'
        });
      }
      
      const user = usuarios.find(user => user.id === decoded.id)

      if (!user) {
        return res.status(401).json({error: 'EL usuario no existe'})
      }

      req.user = user;
      next();
    });
   };
   

// REGISTER
app.post('/register', (req, res) => {

  const { nombre, password, direccion } = req.body
 
  const yaExiste = usuarios.find(usuario => usuario.nombre == nombre)
  if (yaExiste) {
    return res.json({ error: 'ya existe ese usuario' });
  }
 
  const usuario = { nombre, password, direccion }
 
  usuarios.push(usuario)
 
  const access_token = generateToken(usuario)
 
  res.json({ usuario, access_token })
 })
 

// LOGIN
app.post('/login', (req, res) => {

    const { nombre, password } = req.body
   
    const usuario = usuarios.find(u => u.nombre == nombre && u.password == password)
    if (!usuario) {
      return res.json({ error: 'credenciales invalidas' });
    }
   
    const access_token = generateToken(usuario)
   
    res.json({ access_token })
   })
   
app.get('/profile', auth, (req, res) => {
  return res.json(req.user)
})
  