"use strict";
class Color {
    constructor(color) {
        this.getColor = () => {
            return this.color;
        };
        this.generateColor = () => {
            return `color: rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        };
        this.color = color;
    }
}
const colorcito = new Color(`rgb(255, 255, 255)`);
console.log(colorcito.generateColor());
