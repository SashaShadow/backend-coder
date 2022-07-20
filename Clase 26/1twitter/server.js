import express from 'express';
const { Router } = express;
import session from 'express-session';
import { Server as HttpServer } from "http";
import flash from 'connect-flash';
import passport from 'passport';
import {Strategy as TwitterStrategy }from 'passport-twitter';
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from 'mongoose'
import { profile } from 'console';

// import User from './models/user'

//import { createHash, isValidPassword } from './utils'

//mongoose.connect('mongodb://localhost:27017/clase25')

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

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
app.set('view engine', 'ejs')


passport.use(new TwitterStrategy({
    consumerKey: 'pUYqqg0shDxm71ZtjOTPBPf77' ,
    consumerSecret: 'MgNovTa4G0OfMLKb4wzllqZcsVZERva2XtCScih98oEFE57rfT' ,
    callbackURL: 'http://localhost:8080/api/auth/twitter/callback'
}, (token, tokenSecret, profile, done) => {
    User.findOrCreate(profile.id, (err, user) => {
        if (err) { return done(err)} ;
        done(null, user);
    });
}))

router.get('/auth/twitter', passport.authenticate('twitter'))

router.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login'}))

app.use('/api', router);
app.use((req, res, next) => {
    res.status(404).send({error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`});
  });