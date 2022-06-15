const { options } = require("./mariaDb.js");
const knex = require("knex")(options);

const perfumes = [
    {name: "Fahrenheit - Dior", price: 14629, code: "fhtdior", stock: 15},
    {name: "Mercedes Benz Intense", price: 20000, code: "mrcbnz", stock: 15},
    {name: "Sauvage - Dior", price: 14629, code: "svgdior", stock: 15}
]


knex("fragances").insert(perfumes)
.then(() => console.log("datos insertados"))
.catch(err => {console.log(err); throw err})
.finally(() => knex.destroy());