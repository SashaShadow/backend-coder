const { options } = require("./mariaDbOptions.js");
const knex = require("knex")(options);

const cars = [
    {name: "Audi", price: 324235},
    {name: "Mercedes", price: 34236},
    {name: "Ferrari", price: 43253}
]


knex("cars").insert(cars)
.then(() => console.log("datos insertados"))
.catch(err => {console.log(err); throw err})
.finally(() => knex.destroy());