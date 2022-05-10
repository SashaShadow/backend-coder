const express = require('express')
const fs = require("fs");

const app = express()

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.send(`
    <style> 
      a {
      text-decoration: none; 
      color: #d7bde2;
      }
      body {
      background-color: black;
      }
      a:hover {
      color: white;
      }
    </style>
    <div style='height: 50vh; width: 100vw;'>
    <h1 style='color:purple; text-align:center;'>Productos de la tienda</h1>
    <ul style='text-align:center;'>
      <li class='ora'><h3><a href="/productos">Todos los productos</a></h3></li>
      <li class='ora'><h3><a href="/productoRandom">Producto random</a></h3></li>
    </ul>
    </div>
    `)
 })

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

  /*
    getAll() {
        fs.promises.readFile(`./${this.archivo}`, "utf-8")
        .then(data => {
          const objetos = (JSON.parse(data)); 
           console.log(objetos)
        })
        .catch(err => {
            console.log("No hay contenido", err)
        })
    }  
  */
  
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.archivo, "utf-8")
            const objetos = await data ? (JSON.parse(data)) : []
            return objetos;
        } 
        catch(err) {
            console.log(err)
        }
    }
  
    deleteById(id) {
        let archivo = this.archivo;
        fs.promises.readFile(`./${archivo}`, "utf-8")
        .then(contenido => {
            let contenidoFiltrado = JSON.parse(contenido).filter(elem => elem.id !== id)
            let existeId = JSON.parse(contenido).some(elem => elem.id === id);
            async function eliminar() {
                try {
                    await fs.promises.writeFile(`./${archivo}`, JSON.stringify(contenidoFiltrado, null, 2))
                    !existeId ? console.log("No se ha encontrado el objeto con la id indicada") : console.log("Objeto borrado");
                }
                catch(err) {
                    console.log("No se pudo eliminar", err)
                }
            }
            eliminar();
        })
        .catch(err => {
            console.log("Algo ha fallado", err)
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


const myCont = new Contenedor("productos.txt");

const random = (max) => {
   return Math.floor(Math.random() * (max));
}

app.get('/productos', async (req, res) => {
  res.json(await myCont.getAll())
})

app.get('/productoRandom', async (req, res) => {
    let datos = await myCont.getAll();
    res.json(datos[random(datos.length)])
 })

/*myCont.getAll().then(result => {
  let longitud = result.length;
  
  app.get('/productos', (req, res) => {
    res.json(result);
 }) 

  app.get('/productoRandom', (req, res) => {
    res.json(result[random(longitud, 0)])
 })
  
}); */

