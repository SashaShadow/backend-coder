class Color {
    color: string

    constructor(color: string) {
        this.color = color;
    }

    getColor = () => {
        return this.color;
    }

    generateColor = () :string => {
        return `color: rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    }
}

const colorcito = new Color(`rgb(255, 255, 255)`);

console.log(colorcito.generateColor());