import {sqliteOptions} from "./sqlite.js";
import knex from 'knex';
const knex2 = knex(sqliteOptions);

knex2("mensajes").del()
.then(() => console.log("all mensajes deleted"))
.catch(err => {console.log(err); throw err})
.finally(() => knex2.destroy());