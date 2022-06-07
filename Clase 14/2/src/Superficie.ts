export default class Area {
    constructor() {}

    areaCuadrado = (lado:number):number => {
        return lado * lado;
    }

    areaRectangulo = (lado:number, lado2:number):number => {
        return lado * lado2;
    }

    areaCirculo = (radio:number):number => {
        return 3.14 * radio * radio;
    }
}