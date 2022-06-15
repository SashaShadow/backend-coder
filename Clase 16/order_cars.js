const { options } = require("./mariaDbOptions.js");
const knex = require("knex")(options);

knex.from("cars").select("name, price").orderBy("price", "id")
.then((rows) => {
    for (row of rows) {
        console.log(`${row["name"]} ${row["price"]}`)
    }
}).catch(err => {console.log(err); throw err})
.finally(() => knex.destroy());