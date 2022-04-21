class Contador {
    constructor(nombre) {
        this.nombre = nombre
        this.cuenta = 0
    }

    static valorc = 0;

    obtenerResponsable = () => {
        return console.log(this.nombre);
    }

    obtenerCuentaIndividual = () => {
        return console.log(this.cuenta);
    }

    obtenerCuentaGlobal = () => {
        return console.log(Contador.valorc);
    }

    contar = () => {
        Contador.valorc += 1;
        this.cuenta += 1;
    }
}

const sashi = new Contador("Sasha");

sashi.obtenerResponsable();

sashi.contar()