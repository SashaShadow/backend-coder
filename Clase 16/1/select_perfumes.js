const { options } = require("./mariaDb.js");
const knex = require("knex")(options);

knex.from("fragances").select("*")
.then((rows) => {
    for (row of rows) {
        console.log(`${row["id"]} ${row["name"]} ${row["price"]} ${row["code"]}  ${row["stock"]}`)
    }
}).catch(err => {console.log(err); throw err})
.finally(() => knex.destroy());