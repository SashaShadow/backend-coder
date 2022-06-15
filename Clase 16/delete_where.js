const { options } = require("./mariaDbOptions.js");
const knex = require("knex")(options);

knex.from("cars").where("id", "=", "1").del()
.then(() => console.log("all cars deleted"))
.catch(err => {console.log(err); throw err})
.finally(() => knex.destroy());