export const messageType = `
    type Author {
        email: String,
        nombre: String,
        apellido: String,
        edad: Int
        alias: String
        avatar: String
    }
    type Message {
        id: ID!
        author: Author,
        text: String,
        time: String,
    }`;
