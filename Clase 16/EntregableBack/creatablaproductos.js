import {options} from "./mariaDb.js";
import knex from 'knex';
const knex2 = knex(options);


knex2.schema.createTable("fragancias", table => {
    table.increments("id")
    table.string("name", 25).notNullable()
    table.float("price").unsigned()
    table.integer("stock").unsigned()
    table.string("photo")
    table.string("code", 10).notNullable()
    table.string("desc", 50).notNullable()
})
.then(() => console.log("tabla creada"))
.catch(err => {console.log(err); throw err})
.finally(() => knex2.destroy());