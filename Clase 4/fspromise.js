const fs = require("fs");

const leerfn = async () => {
    fs.promises.readFile("./info.txt", "utf-8")
    .then(contenido => {
        console.log(contenido);
    })
    .catch(error => {
        console.log("No se pudo leer", error)
    })
}

leerfn();