console.log(process.env)

export const config = {
    NODE_ENV: process.env.NODE_ENV || 'dev',
    host: process.env.host || "127.0.0.1",
    puerto: process.env.port || 3000
}

//si ponemos esta config en un server.js y levantamos el servidor se pueden usar
//convencion: escribir con mayus las variables de entorno