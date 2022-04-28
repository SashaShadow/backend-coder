const fs = require("fs");

fs.readFile("./package.json", "utf-8", (e, contenido) => {
    if(e) {
        console.log(e);
        console.log("No pudo leerse el archivo");
    } else {
        console.log(contenido);
    }
})


const info = {
    contenidoStr: "contenido",
    contenidoObj: {
        contenido: "contenido",
    },
    size: 250,
}

const infostr = JSON.stringify(info);

fs.writeFile("./info.txt", infostr, (error) => {
    if (error) {
        throw new Error(error);
    } else {
        console.log("archivo escrito");
    }
})
