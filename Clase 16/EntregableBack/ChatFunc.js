import {options} from "./sqlite.js";
import knex from 'knex';
const knex2 = knex(options);

class Chat {
    constructor(tabla) {
        this.tabla = tabla;
    }

    async postMsg(req, res) {
        const mensajeNuevo = req.body;
        let tabla = this.tabla;

        if (mensajeNuevo.texto && mensajeNuevo.email) {
                mensajeNuevo.time = new Date().toLocaleString();
                knex2(tabla).insert(mensajeNuevo)
                .then(() => {
                    console.log("Mensaje enviado")
                })
                .catch(err => {console.log(err); throw err})
        } else {
            return console.log({ error: "Falta completar algún campo" });
        }
    }


    //JSON response
    async getMsgs(req, res) {
        let mensajes = [];
        knex2.from(this.tabla).select("*")
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
        let mensajes = [];
        return knex2.from(this.tabla).select("*")
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

