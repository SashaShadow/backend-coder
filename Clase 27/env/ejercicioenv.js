
const envObj = {
    modo: process.env.MODO || 'prod',
    puerto: process.env.PUERTO || '0',
    debug: process.env.DEBUG || 'false' ,
}

console.log(envObj);