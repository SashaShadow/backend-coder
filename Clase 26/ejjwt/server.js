import express from 'express';
const { Router } = express;
import session from 'express-session';
import { Server as HttpServer } from "http";
import flash from 'connect-flash';
import jwt from 'jsonwebtoken';
const PRIVATE_KEY = 'fahrenheit77'
import FileStore from 'session-file-store'

const myFS = FileStore(session);

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", express.static("./public"));
app.set("view engine", "ejs"); 
app.set("views", "./views") 
app.use(flash())

const httpServer = new HttpServer(app);

const router = Router();

const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(session({
  store: new myFS({ path: './sessions', ttl: 60 }),
  secret: 'qwerty',
  resave: true,
  saveUninitialized: true,
}))

const usuarios = [];

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
   
      req.user = decoded.data;
      next();
    });
   };
   

router.get('/', auth, (req, res) => {
  //
})

// REGISTER
router.post('/register', (req, res) => {

  const { nombre, password, direccion } = req.body
 
  const yaExiste = usuarios.find(usuario => usuario.nombre == nombre)
  if (yaExiste) {
    return res.json({ error: 'ya existe ese usuario' });
  }
 
  const usuario = { nombre, password, direccion }
 
  usuarios.push(usuario)
 
  const access_token = generateToken(usuario)
 
  res.json({ access_token })
 })
 

// LOGIN
router.post('/login', (req, res) => {

    const { nombre, password } = req.body
   
    const usuario = usuarios.find(u => u.nombre == nombre && u.password == password)
    if (!usuario) {
      return res.json({ error: 'credenciales invalidas' });
    } else {
      req.session.username = usuario;
      res.redirect('/api/')
    }
   
    const access_token = generateToken(usuario)
   
    res.json({ access_token })
   })
  
   //LOGOUT
  router.get('/logout', (req, res) => {

    return req.session.destroy(err => {
        if (!err) {
            return res.redirect('/api/login')
        }
        return res.send({ error: err })
        }) 
   })

app.use('/api', router);
app.use((req, res, next) => {
       res.status(404).send({error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`});
     });