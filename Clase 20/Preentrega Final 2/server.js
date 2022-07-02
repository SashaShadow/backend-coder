import express from "express";

import productsRouter from "./routers/productsRouter.js";
import cartRouter from "./routers/cartRouter.js";

const app = express()

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)
