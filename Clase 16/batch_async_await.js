const { default: knex } = require("knex")

(async () => {
    try {

        await knex("cars").del();
        await knex("cars").insert(cars);

        let rows = await knex.from("cars").select("*")
        for (row of rows) console.log(`${row["id"]} ${row["name"]} ${row["price"]}`)

        await knex("cars").insert({name: "Fiat", price: 13114});

        rows = await knex.from("cars").select("*")
        for (row of rows) console.log(`${row["id"]} ${row["name"]} ${row["price"]}`)
    }
    catch(err) {
        console.log(err)
    }
    finally {
        knex.destroy()
    }
})()