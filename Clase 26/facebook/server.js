import express from "express";
import session from 'express-session';
import passport from 'passport';
import { Strategy as FacebookStrategy } from "passport-facebook";


const app = express()

app.use(session({
    secret: 'fahrenheit',
    resave: true,
    saveUninitialized: true
   }))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())

passport.use(new FacebookStrategy({
    clientID: '454125732911851',
    clientSecret: 'cea0b658ed1ad3d4dc258b25d2eb8441',
    callbackURL: 'http://localhost:8080/auth/facebook/callback'
}, (token, tokenSecret, profile, done) => {
    return done(null, {
        user: 'Sasha',
        id: 7
    })
}))


passport.serializeUser((user, done) => {
    console.log('serializeUser')
    done(null, user._id)
  })
  
  passport.deserializeUser((id, done) => {
    console.log('deserializeUser')
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
  