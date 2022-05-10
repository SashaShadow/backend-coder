const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

let nombres = [];

productos.forEach(elem => nombres.push(elem.nombre));

console.log(nombres);

let precioTotal = 0;

productos.forEach(elem => precioTotal += elem.precio);

console.log(precioTotal);

let promedio = precioTotal / productos.length;

console.log(promedio);

let menorPrecio = productos[0];

productos.forEach(elem => {
    if (elem.precio <= menorPrecio.precio) {
        menorPrecio = elem;
    }
} );

console.log(menorPrecio);

let mayorPrecio = productos[0];

productos.forEach(elem => {
    if (elem.precio >= mayorPrecio.precio) {
        mayorPrecio = elem;
    }
} );

