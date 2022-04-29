const fs = require("fs");


class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    save(obj) {
        let archivo = this.archivo;
        fs.promises.readFile(`./${archivo}`, "utf-8")
        .then( contenido => {
            if (contenido.length) { 
                let longit = JSON.parse(contenido).length;
                obj.id = JSON.parse(contenido)[longit - 1].id + 1;
                async function agregar() {
                    try {
                        let contenidoNuevo = JSON.parse(contenido);
                        contenidoNuevo.push(obj); 
                        await fs.promises.writeFile(`./${archivo}`, JSON.stringify(contenidoNuevo, null, 2))
                        console.log(`Id del producto: ${obj.id}`);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                agregar(); 
            } else {
                obj.id = 1;
                async function iniciarJson() {
                    try {
                        let contenidoNuevo = [obj];
                        await fs.promises.writeFile(`./${archivo}`,  JSON.stringify(contenidoNuevo, null, 2))
                        console.log(`Id del producto: ${obj.id}`);
                    }
                    catch(err) {
                        console.log("Hubo un error", err);
                    }   
                }
                iniciarJson(); 
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    getById(id) {
        let archivo = this.archivo;
        fs.promises.readFile(`./${archivo}`, "utf-8")
        .then(contenido => {
            const resultado = JSON.parse(contenido).find(element => element.id === id)
            if (resultado) {
                console.log(resultado);
            } else {
                console.log(null);
            }
        })
        .catch(err => {
            console.log("No se pudo encontrar", err)
        })
    }

    getAll() {
        let archivo = this.archivo;
        fs.promises.readFile(`./${archivo}`, "utf-8")
        .then(contenido => {
            console.log(JSON.parse(contenido))
        })
        .catch(err => {
            console.log("No hay contenido", err)
        })
    }

    deleteById(id) {
        let archivo = this.archivo;
        fs.promises.readFile(`./${archivo}`, "utf-8")
        .then(contenido => {
            let contenidoFiltrado = JSON.parse(contenido).filter(elem => elem.id !== id)
            let existeId = JSON.parse(contenido).some(elem => elem.id === id);
            async function eliminar() {
                try {
                    fs.promises.writeFile(`./${archivo}`, JSON.stringify(contenidoFiltrado, null, 2))
                    !existeId ? console.log("No se ha encontrado el objeto con la id indicada") : console.log("Objeto borrado");
                }
                catch(err) {
                    console.log("No se pudo eliminar", err)
                }
            }
            eliminar();
        })
        .catch(err => {
            console.log("Algo falló", err)
        }) 
    }

    deleteAll() {
        let archivo = this.archivo;
        async function borrarTodo() {
            try {
                await fs.promises.writeFile(`./${archivo}`, "");
                console.log("Contenido del archivo borrado");
            }
            catch (err) {
                console.log("No se pudo eliminar el contenido del archivo", err)
            }
        }
        borrarTodo();
    }
}

const myCont = new Contenedor("prueba.txt");

myCont.save({ title: "Sashimi", precio: 100, thumbnail: "www.prueba.com/prueba.png"});

//myCont.getAll();

//myCont.getById(2);

//myCont.deleteById(2);

//myCont.deleteAll();