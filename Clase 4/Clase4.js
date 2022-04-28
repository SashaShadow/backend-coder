const fin = () => console.log('terminé')

const mostrarLetras = (str, fnc) => {
    for (let i = 0; i < str.length; i++) {
        setTimeout(() => {
            console.log(str[i])
        }, 1000 * i)
    }
    
    setTimeout(() => {
        fnc()
    }, 1000 * str.length)
}

// setTimeout(() => {
//     mostrarLetras("¡Hola!", fin)
// }, 0)

//mostrarLetras("¡Hola!", fin)

setTimeout(() => {
    mostrarLetras("¡Hola!", fin)
}, 700)

// setTimeout(() => {
//     mostrarLetras("¡Hola!", fin)
// }, 1500)
// setTimeout(() => {
//     mostrarLetras("¡Hola!", fin)
// }, 2000)
