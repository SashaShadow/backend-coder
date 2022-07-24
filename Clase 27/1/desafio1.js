import minimist from "minimist";

const options = {
    default: {
        modo: 'prod',
        puerto: 0,
        debug: false
    }
}

options.alias = {
    m: 'modo',
    p: 'puerto',
    d: 'debug',
}

console.log(minimist(process.argv.slice(2), options))