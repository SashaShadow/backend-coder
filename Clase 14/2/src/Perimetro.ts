export default class Perimetro {
    constructor() {}

    perimetroCuadrado = (lado:number):number => {
        return lado * 4;
    }

    perimetroRectangulo = (lado:number, lado2:number):number => {
        return 2 * (lado + lado2);
    }

    perimetroCirculo = (diametro:number):number => {
        return 3.14 * diametro;
    }
}