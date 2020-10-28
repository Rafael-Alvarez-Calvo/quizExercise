const { sqrt } = require('mathjs');  //sqrt square root proviene delibreria math js y realiza la raiz cuadrada de algo

console.log("hola mundo en backend");

let numero1 = 169;

console.log(`La raiz cuadrada de ${numero1}
            es ${ sqrt(numero1).toString()}`);