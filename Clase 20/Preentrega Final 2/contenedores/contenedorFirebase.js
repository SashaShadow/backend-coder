class contenedorFirebase {
    constructor(db, collection) {
        this.db = db;
        this.collection = collection;
    }

    async getElems(req, res) {
        try {
            const querySnapshot = await this.collection.get()
            const docs = querySnapshot.docs
    
            const response = docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                stock: doc.data().stock,
                desc: doc.data().desc,
                photo: doc.data().photo,
                code: doc.data().code
            }))
            if (this.collection._queryOptions.collectionId === 'products') {
                return response
            } else {
                return docs.map(doc => ({
                    id: doc.id,
                    timestamp: doc.data().timestamp,
                    products: doc.data().products
                }))
            }
        } catch (err){
            console.log(err);
        }
    }

    async getElem(req, res) {
        try {   
            let id = req.params.id;
            const doc = this.collection.doc(`${id}`)
            const item = await doc.get()
            const response = item.data()
            return response
    
        } catch (err){
            console.log(err);
        }
    
    }

    async postElem(req, res) {
        const elemento = this.collection._queryOptions.collectionId === 'products' ? req.body : 
            {timestamp: new Date(), products: []};

            delete elemento.pw;
        
        try {
            const doc = this.collection.doc() 
            await doc.create(elemento)
            if (this.collection._queryOptions.collectionId === 'products') {
                return res.json({Mensaje: "Producto creado"})
            } else {
                return res.json({Mensaje: "Carrito creado"})
            }
        } catch (err){
            console.log(err);
        }
    }

    async putElem(req, res) {
        const elemMod = req.body;

        delete elemMod.pw;

        try {
            const doc = this.collection.doc(`${req.params.id}`)
            let item = await doc.update(elemMod)
            if (this.collection._queryOptions.collectionId === 'products') {
                return res.json({Mensaje: "Producto actualizado"})
            }
        } catch (err){
            console.log(err);
        }

    }

    async deleteElem(req, res) { 
        const doc = this.collection.doc(`${req.params.id}`)
        try {
            const item = await doc.delete()
            if (this.collection._queryOptions.collectionId === 'products') {
                return res.json({Mensaje: "Producto eliminado"})
            } else {
                return res.json({Mensaje: "Carrito eliminado"})
            }
        } catch (err){
            console.log(err);
        }
    }
}

export default contenedorFirebase;