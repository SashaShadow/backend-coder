import express from "express";
import session from 'express-session';
const { Router } = express;
import { db, msgsModel, productsModel, User} from "./dbsConfig.js";
import contenedorMongo from "./contenedorMongoDB.js";
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import productsRouter from "./routers/productsRouter.js";
import randomRouter from './routers/randomRouter.js';
import flash from 'connect-flash';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import cluster from 'cluster';
import os from 'os';
import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, isValidPassword } from './utils.js';
import minimist from "minimist";
import "dotenv/config.js";

const numCpus = os.cpus().length

const options = {
  alias: {
    p: 'PORT',
    m: 'MODO'
  }
}

const myArgs = minimist(process.argv.slice(2), options)
const app = express()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const router = Router();

const PORT = myArgs.PORT || 8080;

if (myArgs.MODO === 'cluster') {
  if (cluster.isPrimary) {
    console.log(`El master con pid numero ${process.pid} esta funcionando`);


    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }


    cluster.on('exit', (worker, code, signal) => {
        console.log(`el worker ${worker.process.pid} murió`)
    });

  } else {

  const server = httpServer.listen(PORT, () => {
      console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
  })
  server.on("error", error => console.log(`Error en servidor ${error}`));
  }
} else if (myArgs.MODO === 'fork' || !myArgs.MODO) {

  const server = httpServer.listen(PORT, () => {
      console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
  })
  server.on("error", error => console.log(`Error en servidor ${error}`));

} 

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/api", express.static("./public"));
app.set("view engine", "ejs"); 
app.set("views", "./views") 
app.use(cookieParser());

app.use(session({
    store: MongoStore.create({
    mongoUrl: process.env.MONGODB,
    mongoOptions: advancedOptions,
    ttl: 600
  }),
    secret: 'fahrenheit',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//PASSPORT STRATEGIES
passport.use('login', new LocalStrategy((username, password, done) => {
    return User.findOne({ username })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Usuario inexistente' })
        }
  
        if (!isValidPassword(user.password, password)) {
          return done(null, false, { message: 'Contraseña incorrecta' })
        }
        
        return done(null, user)
      })
      .catch(err => done(err))
  }))

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  }, (req, username, password, done) => {
    let errMsg = '';
    return User.findOne({ username })
      .then(user => {
        if (user) {
          errMsg = 'El nombre de usuario ya existe'
          return null;
        }
  
        const newUser = new User()
        newUser.username = username
        newUser.password = createHash(password)
        newUser.email = req.body.email

        req.session.user = newUser;
  
        return newUser.save()
      })
      .then(user => {
        if (!user && errMsg !== '') {
          return done(null, false, {message: errMsg})
          }
          return done(null, user)
      })
      .catch(err => {
        return done(err)
      })
   }))

const myChat = new contenedorMongo(db, msgsModel);
const myApi = new contenedorMongo(db, productsModel)

//SOCKETS
io.on("connection", async socket => { 
    console.log("Un nuevo cliente se ha conectado");
 
    socket.emit("Mensajes", await myChat.getElems());
    socket.emit("Productos", await myApi.getElems());

    const data = await myChat.getElems();

    socket.on("new-message", async data => { 
        data.time = new Date().toLocaleString();
        io.sockets.emit("MensajeIndividual", data)
    })

    socket.on("nuevo-producto", async data => {
        const prods = await myApi.getElems();
        data.id = prods[prods.length - 1].id + 1;
        io.sockets.emit("ProductoIndividual", data)
    })
})

passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

//RUTAS MENSAJES CHAT
router.get('/mensajes', async (req, res) => {
    return res.json(await myChat.getElems(req, res))
 })

router.post('/mensajes', async (req, res) => {
    return await myChat.postElem(req, res)
 })

router.get("/", (req, res) => {
    //return res.json({puerto: PORT}) //activar si se quiere verificar en que puertos cae esta ruta con nginx (8080)
    if (req.user) {
        req.session.user = req.user;
        res.render("pages/index.ejs", {user: req.user});
    } else {
        res.redirect('/api/login')
    }
});


// RUTAS AUTH
router.get('/login', (req, res) => {

    if (req.user) {
        return res.redirect('/api/')
    } else {
        res.render("pages/login.ejs", { message: req.flash('error')})
    }
})

router.post('/login', passport.authenticate('login', {
    successRedirect: '/api',
    failureRedirect: '/api/login',
    failureFlash: true
  }))

router.get('/signup', (req, res) => {
    if (req.user) {
        return res.redirect('/api/')
    } else {
        res.render("pages/signup.ejs", { message: req.flash('error') })
    }
})

router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/api',
    failureRedirect: '/api/signup',
    failureFlash: true
  }))


router.get('/logout', (req, res) => {

    const nameRemanent = req.user; 

    if (nameRemanent) {
        return req.session.destroy(err => {
            if (!err) {
              return res.render("pages/logout.ejs", {name: nameRemanent})
            }
            return res.send({ error: err })
          })
    } else {
        return res.render("pages/expired.ejs")
    }  
   })

router.get('/info', (req, res) => {
  return res.render('pages/info.ejs', {info: process, cpus: numCpus})
})


app.use('/api', router);
app.use('/api/random', (req, res, next) => {
  req.port = PORT;
  next()
}, randomRouter);
app.use('/api/products', productsRouter)
app.use((req, res, next) => {
    res.status(404).send({error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`});
  });