import express from "express";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { getPersona, getPersonas, createPersona, updatePersona, deletePersona } from "./crud.js";

const app = express()

app.use(express.static('public'));

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
  })

server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const schema = buildSchema(`
  type Persona {
    id: ID!
    nombre: String,
    edad: Int
  }
  input PersonaInput {
    nombre: String,
    edad: Int
  }
  type Query {
    getPersona(id: ID!): Persona,
    getPersonas(campo: String, valor: String): [Persona],
  }
  type Mutation {
    createPersona(datos: PersonaInput): Persona
    updatePersona(id: ID!, datos: PersonaInput): Persona,
    deletePersona(id: ID!): Persona,
  }
`);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: {
        getPersonas,
        getPersona,
        createPersona,
        updatePersona,
        deletePersona
    },
    graphiql: true,
 })); 


// app.use('', router);

