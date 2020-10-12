// let categorias = ["Deportes", "Pokemon", "Ciencia"];

function pintarMenu(){

    let bodySelector = document.querySelector("body");

    let contenedorLogo = document.createElement("div");
    contenedorLogo.className = "contenedorLogo";

    let logo = document.createElement("img");
    logo.src = "img/logo.png";
    logo.className = "logo";

    bodySelector.prepend(contenedorLogo);
    contenedorLogo.appendChild(logo);

    let contenedorTitulo = document.createElement("div");
    contenedorTitulo.className = "contenedorTitulo";

    let titulo = document.createElement("h1");
    titulo.innerText = "QUIZZER";
    contenedorTitulo.className = "titulo";

    bodySelector.appendChild(contenedorTitulo)
    contenedorTitulo.appendChild(titulo);

    let divCategorias = document.createElement("div");
    divCategorias.className = "divCategorias";
    bodySelector.appendChild(divCategorias);

    // for (let i = 0; i < categorias.length; i++){

    let inputs = document.createElement("button");

    inputs.className = "categorias"
    inputs.innerText = "EMPEZAR A JUGAR";

    inputs.setAttribute("id", "Comenzar");
    inputs.setAttribute("type", "button");
    inputs.setAttribute("name", "comenzar");
    inputs.setAttribute("value", "comenzar");

    
    divCategorias.appendChild(inputs);
    // } 

}
pintarMenu();

let Empezar = document.querySelector("button").addEventListener("click", function(){

    setTimeout(function(){

        window.location = "quiz.html";

    },500);
}) ;