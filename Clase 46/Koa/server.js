import Koa from 'koa';
import koaBody from 'koa-body';
import serve from 'koa-static';
import mount from 'koa-mount';
import flash from 'koa-flash';
import render from 'koa-ejs';
import session from 'koa-session';
import MongooseStore from 'koa-session-mongoose';
import Router from 'koa-router';
import cors from '@koa/cors';
import passport from 'koa-passport';
import mongoose from 'mongoose';
import productsRouter from './routers/products.router.js';
import cartRouter from './routers/carts.router.js';
import messagesRouter from './routers/msgs.router.js';
import orderRouter from './routers/order.router.js';
// import { loginRoute, loginPost, signupRoute, signupPost, logout } from './auth/routes.js';
import { login, signup, serialize, deSerialize } from './auth/auth.js';
// import { logger200, logger404, validateNumber, uploadFile } from "./middlewares/middlewares.js";
// import { logger, loggerError } from "./utils/logger.js";
// import { upload } from './utils/multer.js';
import minimist from "minimist";
import "dotenv/config.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const options = {
    alias: {
      p: 'PORT',
      m: 'MODO',
      d: 'DAO'
    }
  }

const myArgs = minimist(process.argv.slice(2), options)

const app = new Koa();

app.use(koaBody());

const PORT = myArgs.PORT || process.env.PORT || 8080;

const router = new Router({
  prefix: '/api'
})

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on('error', err => console.log({error: err}))

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true, expires: 600 }

mongoose.connect(process.env.MONGODB, advancedOptions);

app.use(cors());
app.use(mount('/api', serve('public')));

render(app, {
  root: path.join(__dirname, 'views'),
  layout: '',
  viewExt: 'ejs',
  cache: false,
  debug: false,
});
app.keys = ['fahrenheit'];
app.use(session({store: new MongooseStore(),  maxAge: 86400000,}, app))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//PASSPORT STRATEGIES
login();
signup();
serialize();
deSerialize();

// RUTAS AUTH
// router.get('/login', loginRoute())
// router.post('/login', loginPost())
// router.get('/signup', signupRoute())
// router.post('/signup', upload.single('photo'), uploadFile(), validateNumber(), signupPost())
// router.get('/logout', logout())

app.use(router.routes());
app.use(productsRouter.routes());
app.use(cartRouter.routes());
app.use(messagesRouter.routes());
app.use(orderRouter.routes());


