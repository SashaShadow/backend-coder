import express from "express";
import Perimetro from "./Perimetro";
import Superficie from "./Superficie";

const app = express();



type Resultado {
    tipo: String,
    figura: String,
    parametros?: any,
    resultado?: Number
}
app.get("/perimetro/:figura", (req, res) => {
    const result: Resultado = {
        tipo: "Perimetro",
        figura: req.params.figura,
    }

    switch (req.params.figura) {
        case "cuadrado":
            const lado: req.query.lado ? Number(req.query.lado) : 0;
    }
});

app.get("/area/:figura", (req, res) => {
});

const PORT = 8080;
app.listen(PORT, () => {
 console.log(`conectado al puerto: ${PORT}`);
});
