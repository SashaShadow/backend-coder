import express from 'express';
import session from 'express-session';
import redis from 'redis';

import RedisStore from 'connect-redis';

const myRStore = RedisStore(session);

const app = express()

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));


//redis-17750.c52.us-east-1-4.ec2.cloud.redislabs.com:17750
const client = redis.createClient({
  url: `redis://default:oyD6lE9f9IdE1LrQq7K5z9Degm6kUtDq@redis-17750.c52.us-east-1-4.ec2.cloud.redislabs.com:17750`,
  legacyMode: true
 })

app.use(session({
  store: new myRStore({
    client,
    ttl: 300
  }),
  secret: 'qwerty',
  resave: true,
  saveUninitialized: true
 }))
   
app.use((req, res, next) => {
    res.status(404).send({error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`});
  });


//KEYS *, set p1 "fahrenheit" etc, set p6 "se va" EX 30, ttl p6
