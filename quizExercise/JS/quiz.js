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
        inputs.setAttribute("id", content[i]);
        inputs.setAttribute("type", "button");
        inputs.setAttribute("name", "respuesta");
        inputs.setAttribute("value", content[i]);

        formulario.appendChild(divRespuestas);
        divRespuestas.appendChild(inputs);

    }
}

// let aciertos = 0;

// localStorage.setItem("Aciertos", aciertos);

function comprobarResultado(contenido){

    let botones = document.querySelectorAll("button");
         
    botones.forEach((boton) =>{
        
        boton.addEventListener("click", (e) =>{

            if(e.target.id == contenido[contadorPregunta].RespuestaCorrecta){
        
                e.target.className = "button green";
                
                // aciertos++;
        
                // localStorage.setItem("Aciertos", aciertos);
        
                setTimeout(function() {
        
                    contadorPregunta++;
        
                    if(contadorPregunta < contenido.length){
        
                        document.querySelector("form").remove();
                        document.querySelector("div").remove();
                        location.reload = Llamada();
                        
        
                    }else{
        
                        document.querySelector("form").remove();
                        document.querySelector("div").remove();
                        pintarQuizResult();
                    }
                            
                }, 1000);
            
            }
                
            // console.log(localStorage);
            
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
                        location.reload = Llamada()
        
                    }else{
        
                        document.querySelector("form").remove();
                        document.querySelector("div").remove();
                        pintarQuizResult(inputsAddAnswers);
                    }
            
                }, 1000);
            
            }
        
        });
    })
    
    
}

function pintarQuizResult(inputsAddAnswers) {

    // let botonesResetMenu = ["Jugar de nuevo","Volver al menú"]
    inputsAddAnswers = [0,1,2,3];

    let bodySelector = document.querySelector("body");

    let formulario = document.createElement("form");
    formulario.className = "formulario";
    bodySelector.prepend(formulario);

    let felicidades = document.createElement("h1");
    felicidades.className = "felicidades";
    felicidades.innerText = "¡FELICIDADES!"
    formulario.appendChild(felicidades);

    let puntuacion = document.createElement("h3");
    puntuacion.className = "puntuacion";
    puntuacion.setAttribute("id", "Score");
    formulario.appendChild(puntuacion);

    document.getElementById("Score").innerText = "Tu resultado ha sido: " + localStorage.getItem("Aciertos") + "/4";

    let addQuestionTittle = document.createElement("h3");
    addQuestionTittle.innerText = "¿Te gustaría añadir una pregunta nueva a quizzer?";
    addQuestionTittle.setAttribute("id", "addQuestionTittle");
    formulario.appendChild(addQuestionTittle);

    let addQuestionLabel = document.createElement("label");
    addQuestionLabel.innerText = "Añade tu pregunta aqui";
    formulario.appendChild(addQuestionLabel)

    let addQuestion = document.createElement("input");
    addQuestion.setAttribute("type", "text");
    addQuestionLabel.appendChild(addQuestion);

    for(i = 0 ; i < inputsAddAnswers.length; i++){

        let inputsAnswers = document.createElement("input");
        inputsAnswers.placeholder = "Introduce una respuesta aquí";
        inputsAnswers.setAttribute("type", "text")
        formulario.appendChild(inputsAnswers);
        console.log(inputsAddAnswers);

    }




    

    // for(i = 0; i < botonesResetMenu.length; i++){

    //     let contenedorBotones = document.createElement("button");
    //     contenedorBotones.className = "divCategorias";

    //     let boton = document.createElement("button");
    //     boton.className = "categorias";
    //     boton.innerText = botonesResetMenu[i];
    //     boton.setAttribute("id", botonesResetMenu[i])

    //     bodySelector.appendChild(contenedorBotones);
    //     contenedorBotones.appendChild(boton);
        
    // }
    
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

