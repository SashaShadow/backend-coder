
const app = (...fn) => {

    const type = fn.some(elem => typeof elem !== 'number');

    const long = fn.length;

    const valTypes = fn.map(elem => {
        return typeof elem;
    })

    const sum = () => {
        let result = 0;

        for (let i = 0; i < long; i++) {
            result += fn[i]
        }
        return result;
    }


    if (!type) {
            console.log ({
                datos: {
                    numeros: fn,
                    promedio: sum() / long,
                    max: Math.max(...fn),
                    min: Math.min(...fn),
                    ejecutable: process.argv[1],
                    pid: process.pid,
                }
            })
        }

    if (type) {
        process.on('exit', (code) => {
            code = -5;
            const error = {error: {
                descripcion: 'error de tipo',
                numeros: fn,
                tipos: valTypes
            }}
            console.log(error)
            console.log(`saliendo con el codigo ${code}`)
        })    
    }

    if (!fn.length) {
        process.on('exit', (code) => {
            code = -4;
            const error = {error: {
                    descripcion: 'entrada vacia'
                }
            }
            console.log(error);
            console.log(`saliendo con el codigo ${code}`)
        })    
    }
}

// app(2, 4, 5, 6, 9, 13);

 app();
