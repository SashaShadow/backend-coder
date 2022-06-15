const { options } = require("./mariaDbOptions.js");
const knex = require("knex")(options);

knex.schema.createTable("cars", table => {
    table.increments("id")
    table.string("name")
    table.integer("price")
})
.then(() => console.log("tabla creada"))
.catch(err => {console.log(err); throw err})
.finally(() => knex.destroy());