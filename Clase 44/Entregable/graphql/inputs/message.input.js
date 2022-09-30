export const messageInput = `
    input AuthorInput {
        email: String,
        nombre: String,
        apellido: String,
        edad: Int
        alias: String
        avatar: String
    }
    input MessageInput {
        author: AuthorInput,
        text: String,
        time: String,
    }`;