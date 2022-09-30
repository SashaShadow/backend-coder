let x = {
    name: "Pirulin",
 price: 250,
 stock: 5,
 photo: "nop",
 code: "prln",
 desc: "se vende en las plazas"
}

const getJson = () => {
    return JSON.stringify(x, null, 2);
}

console.log(getJson());