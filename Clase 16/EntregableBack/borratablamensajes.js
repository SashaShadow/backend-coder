import {options} from "./sqlite.js";
import knex from 'knex';
const knex2 = knex(options);

knex2("mensajes").del()
.then(() => console.log("Todos los mensajes borrados"))
.catch(err => {console.log(err); throw err})
.finally(() => knex2.destroy());