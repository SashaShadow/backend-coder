const fs = require("fs");

class Chat {
    constructor(archivo) {
        this.archivo = archivo;
    }

    save(obj) {
        let archivo = this.archivo;
        fs.promises.readFile(`./${archivo}`, "utf-8")
        .then( contenido => {
            if (contenido.length) { 
                console.log(contenido);
                async function agregar() {
                    try {
                        let contenidoNuevo = JSON.parse(contenido);
                        contenidoNuevo.push(obj); 
                        await fs.promises.writeFile(`./${archivo}`, JSON.stringify(contenidoNuevo, null, 2))
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                agregar(); 
            } else {
                async function iniciarJson() {
                    try {
                        let contenidoNuevo = [obj];
                        await fs.promises.writeFile(`./${archivo}`,  JSON.stringify(contenidoNuevo, null, 2))
                    }
                    catch(err) {
                        console.log("Hubo un error", err);
                    }   
                }
                iniciarJson(); 
            }
        })
    }

    async getAll(){
        try{
            const data = await fs.promises.readFile(this.archivo, "utf-8")
            const objetos = data ? (JSON.parse(data)) : []
            return objetos;
        } 
        catch(err) {
            console.log(err)
        }
    }
}

module.exports = Chat;