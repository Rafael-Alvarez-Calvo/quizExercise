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
let dataStorage = firebase.storage();

// fetch("http://localhost:8080/getJSON");

function getQuestions(){

    return new Promise(resolve => {

        let preguntas = database.ref('PreguntasQuiz/');
        preguntas.on("value",(snapshot) =>{
            resolve(snapshot.val());

        })
    })
}

function pintarPreguntas(content,image){

    try {

        let getImages = dataStorage.ref('/').child(image);
        getImages.getDownloadURL().then((url) =>{
            console.log(url);
            let imagen = document.createElement("img");
            imagen.className = "imagenPreguntas"
            imagen.src = url;
            formulario.prepend(imagen);
    
        })
    }

    catch(e) {
        console.error(e);
    }

    numero++;

    let bodySelector = document.querySelector("body");

    let formulario = document.createElement("form");
    formulario.className = "formulario";
    bodySelector.prepend(formulario);
    
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
        console.log(boton)
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
    })
    
    
}

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

async function Llamada(){

    try {
        let contenido = await getQuestions(contadorPregunta);
        
        pintarPreguntas(contenido[contadorPregunta].P, contenido[contadorPregunta].Img);
        pintarRespuestas(contenido[contadorPregunta].R);
    
        //console.log(document.querySelectorAll("button"));
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

