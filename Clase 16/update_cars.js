const { options } = require("./mariaDbOptions.js");
const knex = require("knex")(options);

knex.from("cars").where("price", ">", "2000").update({price: 5})
.then(() => console.log("cars updated"))
.catch(err => {console.log(err); throw err})
.finally(() => knex.destroy());