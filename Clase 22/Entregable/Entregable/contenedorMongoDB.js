
class contenedorMongo {
    constructor(db, model) {
        this.db = db;
        this.model = model;
    }

    async getElems(req, res) {
        return this.db
        .then(_ => this.model.find({}))
        .then(data => {
            return data
        })
    }

    async postElem(req, res) {
        const elemento = req.body;
        const elemNuevo = new this.model(elemento);

        return this.db
        .then(_ => elemNuevo.save())
        .then(_=> {
            return res.json({Mensaje: "Mensaje enviado"})
        })
    }
}

export default contenedorMongo;