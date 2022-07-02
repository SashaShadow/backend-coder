import getStorage from "../daos/index.js";

const { Router } = express;
const productsRouter = Router()
const productsStorage = getStorage().products


productsRouter.get('', (req, res) => {
    return productsStorage.getElems(req, res)
    .then(productos => {
      console.log(productos)
      return res.json({productos})
    })
    .catch(err => {res.send(err); throw err})
    .finally(() => process.exit())
})

productsRouter.get('/:id', (req, res) => {
    return productsStorage.getElem(req, res)
    .then(producto => {
        console.log(producto)
        return res.json({producto})
    })
    .catch(err => {res.send(err); throw err})
    .finally(() => process.exit())

})

productsRouter.post('', (req, res) => {
    return productsStorage.postElem(req, res)
    .then(producto => {
        console.log('Producto guardado', producto)
    })
    .catch(err => console.error(`Error: ${err.message}`))
    .finally(_ => process.exit())
})

productsRouter.put('', (req, res) => {


})

productsRouter.delete('', (req, res) => {


})