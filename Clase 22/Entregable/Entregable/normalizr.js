import normalizr from 'normalizr';
import { normalize, denormalize, schema } from 'normalizr';

const authorSchema = new normalizr.schema.Entity('author', {}, {idAttribute: 'email'})

const textSchema = new normalizr.schema.Entity('text', {}, {idAttribute: authorSchema});

const mensajesSchema = new normalizr.schema.Entity('mensajes', {
    text: textSchema,
    author: [authorSchema]
})

export const normalizedMessages = (data) => {
    return normalize(data, mensajesSchema)
}