const { urlencoded } = require("express");
const express = require("express");
const multer = require("multer");

const app = express();

app.use("/static", express.static(__dirname + "/public"));
app.use(urlencoded({extended: true}));

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


//SET STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    }, 
    filename: (req, file, cb) => {
        cb(null,  Date.now() + "-" + file.originalname) //para que si se repite no se sobreescriba, pone un nombre original xdxdDxd
    }
})

const upload = multer({storage: storage});

app.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
    const file = req.file;

    if (!file) {
        const error = new Error("Por favor sube un archivo");
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
})

app.post("/uploadmultiple", upload.array("myFiles", 12), (req, res, next) => {
    const files = req.files;

    if (!files) {
        const error = new Error("Por favor elige los archivos");
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(files);
})




