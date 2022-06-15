const { options } = require("./mariaDb.js");
const knex = require("knex")(options);

knex.schema.createTable("fragances", table => {
    table.increments("id")
    table.string("name", 25)
    table.float("price")
    table.integer("stock")
    table.string("code", 10)
})
.then(() => console.log("tabla creada"))
.catch(err => {console.log(err); throw err})
.finally(() => knex.destroy());