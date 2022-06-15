const { options } = require("./mariaDb.js");
const knex = require("knex")(options);

knex.from("fragances").where("id", "=", "2").update({stock: 0})
.then(() => console.log("perfumes updated"))
.catch(err => {console.log(err); throw err})
.finally(() => knex.destroy());