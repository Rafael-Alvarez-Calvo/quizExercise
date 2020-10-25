let numero = 0;
let contador = 0;
let contadorPregunta = 0;

function initDataBase(){

    var firebaseConfig = {
        apiKey: "AIzaSyCr5-k5elpVRcTIuhY6WTY_poj4Bg8wYVs",
        authDomain: "quizzer-project-98194.firebaseapp.com",
        databaseURL: "https://quizzer-project-98194.firebaseio.com",
        projectId: "quizzer-project-98194",
        storageBucket: "quizzer-project-98194.appspot.com",
        messagingSenderId: "361995614965",
        appId: "1:361995614965:web:3b55e3b5bc7d0911e2e3bc"
    };
    
    firebase.initializeApp(firebaseConfig);
}
initDataBase();

let database = firebase.database();

function getQuestions(contadorPregunta){

    let preguntas = database.ref('PreguntasQuiz/');
    let contenido = preguntas.child('PreguntasQuiz/' + [contadorPregunta])

    preguntas.on("value",(snapshot) =>{

        contenido = snapshot.val();

        contenido.map((textObject) =>{

            // pintarPreguntasRespuestas(textObject.Img);
            pintarPreguntas(textObject.P);
            // console.log(pintarPreguntas);
            pintarRespuestas(textObject.R);
            // console.log(contenido);

            // console.log(contenido.textObject.P)

        })

    })

}

function pintarPreguntas(content,contador){

    numero++;
    contador = 0;

    for (let i = 0; i < content[contador].length; i++) {

        let bodySelector = document.querySelector("body");

        let formulario = document.createElement("form");
        formulario.className = "formulario";
        bodySelector.prepend(formulario);
        
        // let imagen = document.createElement("img");
        // imagen.className = "imagenPreguntas"
        // // imagen.src = preguntas[contador].Img;
        // // imagen.src = content[contador].Img;
        // formulario.appendChild(imagen);

        let legend = document.createElement("legend");
        legend.tagName = "legend";
        // legend.innerText = preguntas[contador].P;
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
    
}

function pintarRespuestas(content){

    let formulario = document.querySelector("form");
    let divRespuestas = document.createElement("div");
    divRespuestas.className = "divRespuestas";

    for (let i = 0; i < content.length; i++) {

        let inputs = document.createElement("button");
        
        inputs.tagName = "button"
        // inputs.innerText = preguntas[contador].R[i];
        inputs.innerText = content[i];
        // inputs.setAttribute("id", preguntas[contador].R[i]);
        inputs.setAttribute("id", content[i]);
        
        inputs.setAttribute("type", "button");
        inputs.setAttribute("name", "respuesta");
        // inputs.setAttribute("value", preguntas[contador].R[i]);
        inputs.setAttribute("value", content[i]);

        formulario.appendChild(divRespuestas);
        divRespuestas.appendChild(inputs);

    }
}

// pintarPreguntasRespuestas(contador);

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

getQuestions(contadorPregunta);

// let irMenu = document.getElementById("Jugar de nuevo").addEventListener("click", function(){

//     setTimeout(function(){
//         window.location = "menu.html";
//     }, 1000)
// })

