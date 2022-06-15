import {mariaOptions} from "./mariaDB.js";
import knex from 'knex';
const knex2 = knex(mariaOptions);

knex2.from("fragancias").select("*")
.then((rows) => {
    for (let row of rows) {
        console.log(`${row["id"]} ${row["name"]} ${row["price"]}`)
    }
}).catch(err => {console.log(err); throw err})
.finally(() => knex2.destroy());