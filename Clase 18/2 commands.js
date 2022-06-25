

const clientes2 = [{"nombre": "Consu" , "edad": 36}, 
{"nombre": "Alex" , "edad": 29},
{"nombre": "Omar" , "edad": 22},
{"nombre": "Jere" , "edad": 25},
{"nombre": "Maria" , "edad": 25}
]

db.clientes.insertMany(clientes2)

db.clientes.find({}).sort({"edad": -1})

db.clientes.find({}).sort({"edad": 1}).limit(1)

db.clientes.find({}).sort({"edad": 1}).limit(1).skip(1)

db.clientes.find({"nombre": "Jere"})

db.clientes.find({$or: [{"nombre": "Jere"}, {"nombre": "Tamara"}]}) 

db.clientes.find({"edad": {$gt: 25}})

db.clientes.find({"edad": {$lte: 25}})

db.clientes.find({"edad": {$ne: 25}})

db.clientes.update({"nombre": "Jere"}, {$set: {"edad": 100}})

db.clientes.updateMany({"edad": 27}, {$set: {"edad": 28}})

db.clientes.deleteOne({"nombre": "Omar"})