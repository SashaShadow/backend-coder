import { loggerError } from "../utils/logger.js";
import { productService } from "./products.controller.js";
import { cartService } from "./cartController.js";

export const home = async (ctx) => {
    return await ctx.render('pages/info')
    if (ctx.isAuthenticated()) {
        console.log(ctx.state.user);
        // req.session.user = req.user;
        return ctx.body = ctx.state.user;
        return productService.getProducts()
      .then(products => {
        res.render("pages/index.ejs", {user: ctx.state.user, products: JSON.parse(JSON.stringify(products))});
      }).catch(err => {loggerError.error(err); throw err})
    } else {
        ctx.redirect('/api/login')
    }
}

// export const profile = (req, res) => {
//     if (req.user) {
//       res.render("pages/profile.ejs", {user: req.user});
//     } else {
//       res.redirect('/api/login')
//     }
// }

// export const cart = async (req, res) => {
//     if (req.user) {
//       const userId = req.params.id;
//       return cartService.getOwnCart(userId)
//       .then(carts=> {
//           res.render("pages/cart.ejs", {user: JSON.stringify(req.user), carts: carts});
//       })
//       .catch(err => {loggerError.error(err); throw err})
//     } else {
//       res.redirect('/api/login')
//     }
//   }