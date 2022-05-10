const moment = require('moment');

moment.locale("es")

const today = moment().format("MMMM Do YYYY");

const today2 = moment();

const bday = moment("28121994", "DDMMYYYY").format("MMMM Do YYYY");

const bday2 = moment("28121994", "DDMMYYYY");

const sincebday = today2.diff(bday2, 'years');

const daysincebday = today2.diff(bday2, 'days');

console.log(`Hoy es ${today}`);

console.log(`Nacì el ${bday}`);

console.log(`Desde mi nacimiento han pasado ${sincebday} años`);

console.log(`Desde mi nacimiento han pasado ${daysincebday} dias`);