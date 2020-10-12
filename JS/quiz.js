let numero = 0;
let contador = 0;

// let botonesResetMenu = ["Jugar de nuevo","Volver al menú"]

let preguntas = [
    {
        Img: `img/louis-Armstrong.jpg`,
        P : "¿Qué instrumento tocaba Louis Amstrong?",
        R : ["Piano","Trompeta","Tambor","Guitarra"],
        RespuestaCorrecta : "Trompeta"
    },

    {
        Img: `img/Arbeloa2012.jpg`,
        P : "¿En que equipo jugó arbeloa antes de jugar en el Real Madrid?",
        R : ["R.M. Castilla","R.C.D. La Coruña","Liverpool F.C","West Ham United F.C."],
        RespuestaCorrecta : "Liverpool F.C"
    },
    {
        Img: `img/maraton.jpeg`,
        P : "En una carrera, un corredor adelanta al que va segundo. ¿En que posicion se coloca?",
        R : ["Tercero","Primero","Segundo"],
        RespuestaCorrecta : "Segundo"
    },
    {
        Img: `img/Gengar.png`,
        P : "¿Cual es este pokemon?",
        R : ["Gastly","Gengar","Haunter","Drowzee"],
        RespuestaCorrecta : "Gengar"
    }
];


function pintarPreguntasRespuestas(contador){

    numero++;

    let bodySelector = document.querySelector("body");

    let formulario = document.createElement("form");
    formulario.className = "formulario";
    bodySelector.prepend(formulario);
    
    let imagen = document.createElement("img");
    imagen.className = "imagenPreguntas"
    imagen.src = preguntas[contador].Img;
    formulario.appendChild(imagen);
    
    let legend = document.createElement("legend");
    legend.tagName = "legend";
    legend.innerText = preguntas[contador].P;
    formulario.appendChild(legend);

    let contenedorNumeroPregunta = document.createElement("div");
    contenedorNumeroPregunta.className = "contenedorNumeroPregunta";

    let numeroPregunta = document.createElement("h1");
    numeroPregunta.className = "numeroPregunta";
    numeroPregunta.innerText = "Pregunta " + numero;

    bodySelector.prepend(contenedorNumeroPregunta);

    contenedorNumeroPregunta.appendChild(numeroPregunta);
    
    for (let i = 0; i < preguntas[contador].R.length; i++) {

        let divRespuestas = document.createElement("div");
        divRespuestas.className = "divRespuestas";
     
        let inputs = document.createElement("button");
        
        inputs.tagName = "button"
        inputs.innerText = preguntas[contador].R[i];
        inputs.setAttribute("id", preguntas[contador].R[i]);
        
        inputs.setAttribute("type", "button");
        inputs.setAttribute("name", "respuesta");
        inputs.setAttribute("value", preguntas[contador].R[i]);

        formulario.appendChild(divRespuestas);
        divRespuestas.appendChild(inputs);

    }
}

pintarPreguntasRespuestas(contador);

let aciertos = 0;

localStorage.setItem("Aciertos", aciertos);
     
let boton = document.addEventListener("click", function(e){

    if(e.target.id == preguntas[contador].RespuestaCorrecta){

        e.target.className = "button green";
        
        aciertos++;

        localStorage.setItem("Aciertos", aciertos);

        setTimeout(function() {

            contador++;

            if(contador < preguntas.length){

                document.querySelector("form").remove();
                document.querySelector("div").remove();
                location.reload = pintarPreguntasRespuestas(contador);

            }else{

                document.querySelector("form").remove();
                document.querySelector("div").remove();
                pintarQuizResult();
            }
                    
        }, 1000);
    
    }
        
    console.log(localStorage);
    
    if(e.target.id !== preguntas[contador].RespuestaCorrecta){
    
        e.target.className="button red";

        document.querySelectorAll("button").forEach(function(boton){
                
            if(boton.id == preguntas[contador].RespuestaCorrecta){

                boton.className = "button green"
            }
        })
    
        setTimeout(function() {

            contador++;
    
            if(contador < preguntas.length){

                document.querySelector("form").remove();
                document.querySelector("div").remove();
                location.reload = pintarPreguntasRespuestas(contador);

            }else{

                document.querySelector("form").remove();
                document.querySelector("div").remove();
                pintarQuizResult();
            }
    
        }, 1000);
    
    }

    // if(e.target.id == botonesResetMenu[0]){

    //     setTimeout(function(){

    //         window.location = "quiz.html"
    //     },1000)
    // }

    // if(e.target.id == botonesResetMenu[1]){

    //     setTimeout(function(){

    //         window.location = "menu.html"
    //     },1000)
    // }

});

function pintarQuizResult() {

    // let botonesResetMenu = ["Jugar de nuevo","Volver al menú"]

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

// let irMenu = document.getElementById("Jugar de nuevo").addEventListener("click", function(){

//     setTimeout(function(){
//         window.location = "menu.html";
//     }, 1000)
// })

