import * as operaciones from "./operaciones";

const mensaje:string = "Hola Typescript";

console.log(mensaje);

let num1:number = 10, num2:number = 4;

console.log(`La suma de ${num1} mas ${num2} es ${operaciones.sumar(num1, num2)}`);
console.log(`La resta entre ${num1} y ${num2} es ${operaciones.restar(num1, num2)}`);
console.log(`La multiplicacion entre ${num1} y ${num2} es ${operaciones.multiplicar(num1, num2)}`);
console.log(`La division entre ${num1} y ${num2} entre ${operaciones.dividir(num1, num2)}`);

