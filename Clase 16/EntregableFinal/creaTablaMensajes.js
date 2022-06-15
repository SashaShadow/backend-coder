import {sqliteOptions} from "./sqlite.js";
import knex from 'knex';
const knex2 = knex(sqliteOptions);

knex2.schema.createTable("mensajes", table => {
    table.string("email", 30)
    table.string("texto", 255)
    table.string("time")
})
.then(() => console.log("tabla creada"))
.catch(err => {console.log(err); throw err})
.finally(() => knex2.destroy());