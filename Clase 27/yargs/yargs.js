import yargs from 'yargs';

const args = process.argv.slice(2)
.alias({
    nombre: 'n'
})
.default({
    nombre: 'Sasha',
    apellido: 'Rodriguez'
}
)
.boolean('ayuda')
.argv