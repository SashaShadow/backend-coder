import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';

//seguir este

const app = express()

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

app.use(session({
    store: new myRStore({ client, ttl: 60 }),
    secret: 'qwerty',
    resave: true,
    saveUninitialized: true
   }))
   

app.get('/root', (req, res) => {
    const name = req.query.name;
    if (req.session.contador) {
      req.session.contador++
      if (name) {
        return res.send(`Visitaste ${req.query?.name} ${req.session.contador} veces el sitio.`)
      } else {
        return res.send(`Visitaste ${req.session.contador} veces el sitio.`)
      }
    }
   
    req.session.contador = 1
    if (name) {
        res.send(`Te damos la bienvenida ${req.query?.name}`)
    } else {
        res.send(`Te damos la bienvenida`)
    }
   })

app.get('/olvidar', (req, res) => {
    return req.session.destroy(err => {
      if (!err) {
        return res.send({ logout: true })
      }
      return res.send({ error: err })
    })
   })
   
   

app.use((req, res, next) => {
    res.status(404).send({error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`});
  });