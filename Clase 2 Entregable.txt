class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName = () => {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota = (mascota) => {
        if (typeof mascota === "string" ) {
            this.mascotas.push(mascota)
        } else {
          return console.log("Se requiere que escribas texto")
        }
    }

    countMascotas = () => {
        return this.mascotas.length;
    }

    addBook = (name, autor) => {
        if (typeof name === "string" && typeof autor === "string") {
            this.libros.push({nombre: name, autor: autor})
        } else {
          return console.log("Se requiere que escribas texto")
        }
    }

    getBookNames = () => {
      let nombres = [];
      this.libros.forEach(book => {
        nombres.push(book.nombre);
      })
      return nombres;
    }
}

const usuario = new Usuario("Sasha", "Rodriguez", [{nombre: "Harry Potter", autor: "J.K Rowling" }, 
{ nombre: "Simbolos de Transformación", autor: "Carl Jung"}], ["Luna", "Gary", "Nana"]);

console.log(usuario.getBookNames())
console.log(usuario.countMascotas()) 
console.log(usuario.getFullName())
console.log(usuario.addBook("Rayuela", "Julio Cortazar"))
console.log(usuario.getBookNames())

