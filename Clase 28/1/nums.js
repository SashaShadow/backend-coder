const calc = (...args) => {
    let x = [];

    for (let i = 0; i < args.length; i++) {
        if (x.some(elem => elem.n === args[i])) {
            x.forEach(elem => {
                if (elem.n === args[i]) {
                    elem.cn += 1;
                }
            })
        } else {
            x.push({n: args[i], cn: 1})
        }
    }
    return x;
}


console.log(calc(1,2,3,4,5,5,5,6,7,8,9,9,9));
