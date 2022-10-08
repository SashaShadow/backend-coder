import passport from 'koa-passport';
import flash from 'koa-flash';

export const loginRoute = () => {
    return (ctx) => {

        if (ctx.isAuthenticated()) {
            return ctx.redirect('/api/')
        } else {
            ctx.render("pages/login.ejs", { message: this.flash('error')})
        }
    }
}

export const loginPost = () => {
    return passport.authenticate('login', {
        successRedirect: '/api',
        failureRedirect: '/api/login',
        failureFlash: true
      })
}

export const signupRoute = () => {
    return (ctx) => {
        if (ctx.isAuthenticated()) {
            return ctx.redirect('/api/')
        } else {
            ctx.render("pages/signup.ejs", { message: this.flash('error') })
        }
    }
}

export const signupPost = () => {
    return passport.authenticate('signup', {
        successRedirect: '/api',
        failureRedirect: '/api/signup',
        failureFlash: true
    })
}

export const logout = () => {
    return async (ctx) => {

        const nameRemanent = ctx.state.user; 
    
        if (nameRemanent) {
            ctx.logout()
            .then(_ => {
                ctx.session = null;
                ctx.render("pages/logout.ejs", {name: nameRemanent})
            })
            .catch(err => {
                ctx.body = {error: err}
            })
        } else {
            return ctx.render("pages/expired.ejs")
        }  
    }
}