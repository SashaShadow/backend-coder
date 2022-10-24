import passport from 'passport';
import express from 'express';
import jwt from 'jsonwebtoken';
import "dotenv/config.js";

const { Router } = express;

export const authRouter = Router();

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = user => {
    const token = jwt.sign({data: user}, SECRET_KEY, {expiresIn: '24h'});
    return token
}

export const signupPost = () => {
    return (req, res) => {
        passport.authenticate('signup', { 
            session: false,
            // successRedirect: '/api',
            // failureRedirect: '/api/signup',
            // failureFlash: true
         }),
        async (req, res, next) => {
          res.json({
            message: 'Signup successful',
            user: req.user
          });
        }
    }
}

export const loginPost = () => {
    return async (req, res, next) => {
        passport.authenticate(
          'login', {
            //   successRedirect: '/api',
              failureRedirect: '/api/login',
              failureFlash: true,
              passReqToCallback: true,
          },
          async (err, user, info) => {
            try {
              if (err || !user) {
                const error = new Error(`error: ${JSON.stringify(info)}`);
    
                return next(error);
              }
    
              req.login(
                user,
                { session: false },
                async (error) => {
                  if (error) return next(error);
    
                  const body = { email: user.email, password: user.password };
                  const token = generateToken(body);

                  req.session.user = user;
    
                  return res.json({ 
                    mensaje: 'Logeo exitoso', 
                    token 
                  });
                }
              );
            } catch (error) {
              return next(error);
            }
          }
        )(req, res, next);
    }
}

export const signupRoute = () => {
    return (req, res) => {
        if (req.session.user) {
            return res.redirect('/api/')
        } else {
            res.render("pages/signup.ejs", { message: req.flash('error') })
        }
    }
}

export const loginRoute = () => {
    return (req, res) => {
        if (req.session.user) {
            return res.redirect('/api/')
        } else {
            res.render("pages/login.ejs", { message: req.flash('error')})
        }
    }
}
  
export const logout = () => {
    return (req, res) => {

        const nameRemanent = req.session.user.username; 
    
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
       }
}