class Color {

    generateColor = () => {

        return console.log(`color: rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`);
    }
}

const colorcito = new Color;

colorcito.generateColor();