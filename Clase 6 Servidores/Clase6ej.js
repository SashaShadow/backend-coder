const http = require('http');
const moment = require('moment');


const server = http.createServer((req, res) => {
    const theHour = moment().hour();
    //console.log(theHour);
    const message = ( 
    theHour >= 6 && theHour <= 12 ? "Buenos dias!" 
    : theHour >= 13 && theHour <= 19 ? "Buenas tardes!"
    : theHour >= 20 ? "Buenas noches!" : null
    )
    //console.log(message);
    res.end(`<h1>${message}</h1>`)
 })

const connectedServer = server.listen(8080, () => {
    console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`)
 })
 
 