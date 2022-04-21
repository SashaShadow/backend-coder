const mostrarLista = lista => {
    if (lista.length) {
        console.log(lista)
    } else {
        console.log("Lista vacía")
    }
}

//console.log(mostrarLista(["HOLA", "MAN"]));

// (function (lista = [3, 2, 1]) {
//     if (lista.length) {
//         console.log(lista)
//     } else {
//         console.log("Lista vacía")
//     }
// })();

const crearMultiplicador = num => {
    return (num2) => {
        return num * num2
    }
}

const duplicar = crearMultiplicador(2);
const triplicar = crearMultiplicador(3);

console.log(triplicar(4));
console.log(duplicar(4));