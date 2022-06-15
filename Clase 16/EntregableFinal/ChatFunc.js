import knex from 'knex';

class Chat {
    constructor(tabla, options) {
        this.tabla = tabla;
        this.knex = knex(options);
    }

    async postMsg(req, res) {
        const mensajeNuevo = req.body;
        console.log(mensajeNuevo);
        let tabla = this.tabla;
        let knex = this.knex;

        if (mensajeNuevo.texto && mensajeNuevo.email) {
                mensajeNuevo.time = new Date().toLocaleString();
                knex(tabla).insert(mensajeNuevo)
                .then(() => {
                    console.log("Mensaje enviado")
                    //res.redirect("/api");
                })
                .catch(err => {console.log(err); throw err})
        } else {
            return console.log({ error: "Falta completar algún campo" });
        }
    }


    //JSON response
    async getMsgs(req, res) {
        let knex = this.knex;
        let mensajes = [];
        knex.from(this.tabla).select("*")
        .then((rows) => {
            for (let row of rows) {
                mensajes.push({
                    texto: row["texto"],
                    email: row["email"], 
                    time: row["time"],
                })
            }
        })
        .then(() => res.json({mensajes}))
        .catch(err => {res.send(err); throw err})
    }

    //ARRAY response
    async getAll(req, res) {
        let knex = this.knex;
        let mensajes = [];
        return knex.from(this.tabla).select("*")
        .then((rows) => {
            for (let row of rows) {
                mensajes.push({
                    texto: row["texto"],
                    email: row["email"], 
                    time: row["time"],
                })
            }
            return mensajes;
        })
        .then((data) => {
            return data; 
        })
        .catch(err => {res.send(err); throw err})
    }

}

export default Chat;

