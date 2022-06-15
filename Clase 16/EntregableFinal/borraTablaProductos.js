import {mariaOptions} from "./mariaDB.js";
import knex from 'knex';
const knex2 = knex(mariaOptions);

knex2("fragancias").del()
.then(() => console.log("all mensajes deleted"))
.catch(err => {console.log(err); throw err})
.finally(() => knex2.destroy());