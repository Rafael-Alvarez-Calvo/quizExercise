let numero = 0;
let contador = 0;
let contadorPregunta = 0;

async function getQuestions(){

    let response = await fetch("http://localhost:8080/Preguntas", {headers: {"Content-Type": "application/json"}})
    let contenido = await response.json();

        return contenido;
    
}

function pintarPreguntas(content,image){

    numero++;

    let bodySelector = document.querySelector("body");

    let formulario = document.createElement("form");
    formulario.className = "formulario";
    bodySelector.prepend(formulario);

    let imagen = document.createElement("img");
    imagen.className = "imagenPreguntas"
    imagen.src = image;
    formulario.prepend(imagen);
    
    let legend = document.createElement("legend");
    legend.tagName = "legend";
    legend.innerText = content;
    formulario.appendChild(legend);
    
    let contenedorNumeroPregunta = document.createElement("div");
    contenedorNumeroPregunta.className = "contenedorNumeroPregunta";

    let numeroPregunta = document.createElement("h1");
    numeroPregunta.className = "numeroPregunta";
    numeroPregunta.innerText = "Pregunta " + numero;

    bodySelector.prepend(contenedorNumeroPregunta);

    contenedorNumeroPregunta.appendChild(numeroPregunta);
    
}

function pintarRespuestas(content){

    let formulario = document.querySelector("form");
    let divRespuestas = document.createElement("div");
    divRespuestas.className = "divRespuestas";

    for (let i = 0; i < content.length; i++) {

        let inputs = document.createElement("button");
        
        inputs.tagName = "button"
        inputs.innerText = content[i];
        inputs.setAttribute("id", i);
        inputs.setAttribute("type", "button");
        inputs.setAttribute("name", "respuesta");
        // inputs.setAttribute("value", content[i]);

        formulario.appendChild(divRespuestas);
        divRespuestas.appendChild(inputs);

    }
}

function comprobarResultado(contenido){

    let botones = document.querySelectorAll("button");
         
    botones.forEach((boton) =>{
        
        boton.addEventListener("click", (e) =>{

            if(e.target.id == contenido[contadorPregunta].RespuestaCorrecta){
        
                e.target.className = "button green";
                
        
                setTimeout(function() {
        
                    contadorPregunta++;
                    console.log(contadorPregunta);
                    console.log(contenido[contadorPregunta]);
                    console.log(contenido)

                    if(contadorPregunta < contenido.length){
                        
                        document.querySelector("form").remove();
                        document.querySelector("div").remove();
                        Llamada();
                        // location.reload = Llamada();
                        
        
                    }else{
                        
                        document.querySelector("form").remove();
                        document.querySelector("div").remove();
                        // window.location = "quizResult.html";
                    }
                            
                }, 1000);
            
            }
            
            if(e.target.id !== contenido[contadorPregunta].RespuestaCorrecta){
            
                e.target.className="button red";
        
                document.querySelectorAll("button").forEach((boton) =>{
                        
                    if(boton.id == contenido[contadorPregunta].RespuestaCorrecta){
        
                        setTimeout(() =>{
                            
                            boton.className = "button green"
        
                        },200) 
                    }
                });
            
                setTimeout(() => {
        
                    contadorPregunta++;
            
                    if(contadorPregunta < contenido.length){
        
                        document.querySelector("form").remove();
                        document.querySelector("div").remove();
                        Llamada()
        
                    }else{
        
                        document.querySelector("form").remove();
                        document.querySelector("div").remove();
                        // pintarQuizResult(inputsAddAnswers);
                        // window.location = "quizResult.html";
                    }
            
                }, 1000);
            
            }
        
        });
    })
    
    
}

async function Llamada(){

    try {

        let contenido = await getQuestions(contadorPregunta);
        // console.log(contenido);
        pintarPreguntas(contenido[contadorPregunta].P, contenido[contadorPregunta].Img);
        pintarRespuestas(contenido[contadorPregunta].R);
    
        comprobarResultado(contenido);
    }

    catch(e) {
        console.log(e);
    }
}

Llamada();

// let irMenu = document.getElementById("Jugar de nuevo").addEventListener("click", function(){

//     setTimeout(function(){
//         window.location = "menu.html";
//     }, 1000)
// })

