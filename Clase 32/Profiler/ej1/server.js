import express from 'express'

const app = express();

app.use(express.static('public'))

const PORT = parseInt(process.argv[2]) || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));

const randomNo = () => {
    return Math.floor(Math.random() * 10)
}

console.log(randomNo());

app.get('/randoms-nodebug', (req, res) => {
    const numbers = [];

    for (let i = 0; i < 10000; i++) {
        numbers.push(randomNo())
    }

    res.json({randoms: numbers})
})


app.get('/randoms-debug', (req, res) => {
    const numbers = [];

    for (let i = 0; i < 10000; i++) {
        numbers.push(randomNo())
    }

    console.log(numbers);
    res.json({randoms: numbers})
})