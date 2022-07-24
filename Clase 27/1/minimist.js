import minimist from "minimist";


const args = minimist(process.argv.slice(2))
console.log(args)


console.log(minimist(['-a', '1', '-b', '2']))



console.log(minimist(['-a', '1', '-b', '2', '--h', 'hey']))


console.log(minimist(['-a', '1', '-b', '2', '-e', '-d'])) //los ultimos interpretados como booleanos

const options = {
    default: {
        nombre: 'Sasha',
        apellido: 'Rodriguez'
    }
}

console.log(minimist(['-a', '1', '-b', '2'], options))

options.alias = {
    a: 'campoA',
    b: 'campoB'
}

console.log(minimist(['-a', '1', '-b', '2'], options))
