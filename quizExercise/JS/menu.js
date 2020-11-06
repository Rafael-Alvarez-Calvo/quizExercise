let bodySelector = document.querySelector("body");
let contenedorNickName = document.createElement("div");
let nickNameBox = document.createElement("input");
let registrarNick = document.createElement("button");
let contenedorAvisoFalloRegistro = document.createElement("div");

let contadorAvisoFalloRegistro = 0;

function pintarMenu(){

    contenedorNickName.setAttribute("id","contenedorNickName");

    nickNameBox.setAttribute("id","nickNameBox");
    nickNameBox.setAttribute("type","text");

    registrarNick.setAttribute("id","registrarNick");
    registrarNick.setAttribute("type","button");
    registrarNick.innerText = "Registra tu Nick";

    bodySelector.prepend(contenedorNickName);
    contenedorNickName.appendChild(nickNameBox);
    contenedorNickName.appendChild(registrarNick);

    let contenedorTitulo = document.createElement("div");
    contenedorTitulo.className = "contenedorTitulo";

    let titulo = document.createElement("h1");
    titulo.innerText = "QUIZZER";
    contenedorTitulo.className = "titulo";

    bodySelector.prepend(contenedorTitulo)
    contenedorTitulo.appendChild(titulo);

    let contenedorLogo = document.createElement("div");
    contenedorLogo.className = "contenedorLogo";

    let logo = document.createElement("img");
    logo.src = "img/Logo.png";
    logo.className = "logo";

    bodySelector.prepend(contenedorLogo);
    contenedorLogo.appendChild(logo);

}

pintarMenu();

function registrarJugador(){


    document.getElementById("registrarNick").addEventListener("click", () =>{

        let getValueNick = document.getElementById("nickNameBox").value;
        
        let newNickName = {

            Nick : getValueNick
            
        };

        fetch('http://localhost:8080/Player',{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(newNickName)
        })
        .then(res => res.json())
        .then((data) =>{

            let estados = data.status;
            console.log(data, estados)
            // console.log(puntuacion);
            // console.log(data.state);
            switch(estados){

                case "Created":
                case "Updated":

                    contenedorNickName.className = "contenedorFadeOut";

                    setTimeout(() =>{
                    contenedorNickName.className = "contenedorHidden";
                    },550)

                    setTimeout(() =>{

                        let divEmpezar = document.createElement("div");
                        divEmpezar.className = "divEmpezar";
                        bodySelector.appendChild(divEmpezar);
            
                        let start = document.createElement("button");
            
                        start.className = "start"
                        start.innerText = "EMPEZAR A JUGAR";
            
                        start.setAttribute("id", "start");
                        start.setAttribute("type", "button");
                        start.setAttribute("name", "start");
                        start.setAttribute("value", "start");
            
                        divEmpezar.appendChild(start);
            
                        entrarAlMenu();
            
                    },600);

                    break;

                case "Error":
                    setTimeout(() =>{

                        let AvisoNickRegistrado = document.createElement("p");
                        AvisoNickRegistrado.setAttribute("id", "avisoFalloNick")
                        AvisoNickRegistrado.innerText = "Ese Nick ya está registrado";
                        bodySelector.appendChild(AvisoNickRegistrado);
                        contadorAvisoFalloRegistro ++;

                    },100)

                    break;

                case "Invalid":

                    contenedorNickName.className = "contenedorNickName";
                    AvisoFalloRegistroNickCaracteres();

                    break;
            
            }
            
        })

    });
    
}

function AvisoFalloRegistroNickCaracteres(){

    let AvisoFalloNick = document.querySelector("#avisoFalloNick");

    if (AvisoFalloNick)
        AvisoFalloNick.remove();

    setTimeout(() => {
        
        contenedorAvisoFalloRegistro.className = "contenedorAvisoFalloRegistro";
    
        AvisoFalloNick = document.createElement("p");
        AvisoFalloNick.setAttribute("id", "avisoFalloNick");
    
        AvisoFalloNick.innerText = "Su nick debe contener entre 3 y 8 caracteres.";
    
        bodySelector.appendChild(contenedorAvisoFalloRegistro);
    
        contenedorAvisoFalloRegistro.appendChild(AvisoFalloNick);
    }, 200);

    
}


registrarJugador();

async function entrarAlMenu(){

    // await registrarJugador()
    
    //     .then(() =>{

            document.getElementById("start").addEventListener("click", () =>{

                setTimeout(() =>{
        
                    // window.location = "quiz.html";
                    document.querySelectorAll("div").forEach(node =>{
                        node.remove();  
                    })
        
                    // let categoriasTitulo = document.createElement("h1");
                    // categoriasTitulo.innerText = "Elige categoria";
                    // bodySelector.appendChild(categoriasTitulo);
        
                    // let contenedorCategorias = document.createElement("div");
                    
                    // let botonDeportes = document.createElement("button");
                    // botonDeportes.innerText = "DEPORTES";
                    // botonDeportes.setAttribute("id", "Deportes");
        
                    // let botonCiencia = document.createElement("button");
                    // botonCiencia.innerText = "CIENCIA";
                    // botonCiencia.setAttribute("id", "Ciencia");
        
                    // let botonArte = document.createElement("button");
                    // botonArte.innerText = "ARTE";
                    // botonArte.setAttribute("id", "Arte");
        
                    // bodySelector.appendChild(contenedorCategorias);
                    // contenedorCategorias.appendChild(categoriasTitulo);
                    // contenedorCategorias.appendChild(botonDeportes);
                    // contenedorCategorias.appendChild(botonCiencia);
                    // contenedorCategorias.appendChild(botonArte);
        
                    let contenedorModificarPreguntas = document.createElement("div");
        
                    // let modPreguntaLabel = document.createElement("h3");
        
                    // modPreguntaLabel.innerText = "¿Te gustaría modificar, añadir o borrar alguna pregunta?";
        
                    let botonIrModPreguntas = document.createElement("button");
                    botonIrModPreguntas.innerText = "Modificar/Añadir/Borrar Pregunta";
                    botonIrModPreguntas.setAttribute("id", "botonIrModPreguntas")
        
                    bodySelector.appendChild(contenedorModificarPreguntas);
                    // contenedorModificarPreguntas.appendChild(modPreguntaLabel);
                    contenedorModificarPreguntas.appendChild(botonIrModPreguntas);
        
                    document.getElementById("botonIrModPreguntas").addEventListener("click", async() =>{
        
                        PintarFormAñadirPregunta();
        
                        let response = await fetch("http://localhost:8080/Preguntas", {headers: {"Content-Type": "application/json"}}) //esperamos respuesta del  server
        
                        response.json() //esperamos un json del server
                
                            .then((contenido) =>{  //declaramos funcion con contenido como parametro
            
                                contenido.map((data) =>{  //recorremos nuestro contenido y cogemos los datos
        
                                    //Creacion de numero de pregunta, enunciado de pregunta, respuestas y respuesta correcta
                                    PintarPreguntasEditables(data);
                                    
                                })
                            })
                
                    })

                },500);
            })
    
        // })
 
}

async function PintarFormAñadirPregunta(){

    // await entrarAlMenu()

        // .then(() =>{

            document.querySelectorAll("div").forEach(node =>{
                node.remove();  //Cogemos todos los div y los eliminamos al presionar el boton
            })

            let numeroRespuestas = 4;

            let formulario = document.createElement("form");
            formulario.className = "formulario";
            bodySelector.prepend(formulario);

            let addQuestionTittle = document.createElement("h3");
            addQuestionTittle.innerText = "¿Te gustaría añadir una pregunta nueva a quizzer?";
            addQuestionTittle.setAttribute("id", "addQuestionTittle");
            formulario.appendChild(addQuestionTittle);

            let addQuestionLabel = document.createElement("label");
            addQuestionLabel.innerText = "Añade tu pregunta aqui";
            formulario.appendChild(addQuestionLabel)

            let addQuestion = document.createElement("input");
            addQuestion.setAttribute("type", "text");
            addQuestion.setAttribute("id","addQuestion")
            addQuestion.value = "jandmnakmd";
            addQuestionLabel.appendChild(addQuestion);

            for(i = 0 ; i < numeroRespuestas; i++){

                let inputsAnswers = document.createElement("input");
                inputsAnswers.placeholder = "Introduce una respuesta aquí";
                inputsAnswers.setAttribute("type", "text");
                inputsAnswers.setAttribute("id", "Respuesta");
                inputsAnswers.value = "jandmafag<axnakmd";
                formulario.appendChild(inputsAnswers);
                // console.log(inputsAddAnswers);

            }

            let correctAnswer = document.createElement("input");
            correctAnswer.placeholder = "Aquí la respuesta correcta";
            correctAnswer.value = "jandmaffanakmd";
            correctAnswer.setAttribute("id", "respuestaCorrecta");
            correctAnswer.setAttribute("type", "text");
            formulario.appendChild(correctAnswer);

            let autor = document.createElement("input");
            autor.placeholder = "Autor de la pregunta";
            autor.value = "Rafa";
            autor.setAttribute("id", "autor");
            autor.setAttribute("type", "text");
            formulario.appendChild(autor);


            let botonRegistrarPregunta = document.createElement("button");
            botonRegistrarPregunta.innerText = "Envía tu pregunta";
            botonRegistrarPregunta.setAttribute("id", "botonRegistrarPregunta");
            formulario.appendChild(botonRegistrarPregunta);
        // })
}

async function PintarPreguntasEditables(data){

    // await entrarAlMenu()

    //     .then((data) =>{

            let contenedorPregunta = document.createElement("div");

            let labelNumeroPregunta = document.createElement("p");
            labelNumeroPregunta.innerText = `Pregunta ${data.id+1}`;

            let listadoPreguntas = document.createElement("ul");

            let enunciadoPregunta = document.createElement("li");
            enunciadoPregunta.innerText = data.P;
            listadoPreguntas.appendChild(enunciadoPregunta);

            let liRespuestas = document.createElement("li");
            liRespuestas.innerText = "Respuestas : ";
            listadoPreguntas.appendChild(liRespuestas);

            let olRespuestas = document.createElement("ol");
            liRespuestas.appendChild(olRespuestas);

            data.R.map((d) =>{

                let enunciadosRespuestas = document.createElement("li");
                enunciadosRespuestas.innerText = d;
                olRespuestas.appendChild(enunciadosRespuestas);
            })

            let enunciadoRespuestaCorrecta = document.createElement("li");
            enunciadoRespuestaCorrecta.innerText = `Respuesta correcta: ${data.RespuestaCorrecta}`;
            listadoPreguntas.appendChild(enunciadoRespuestaCorrecta);

            //-----------------------------------------------------//

            //Creacion de boton modificar y borrar//////////////

            let contenedorBotones = document.createElement("div");
            contenedorBotones.setAttribute("id", "contenedorBotonesModDel");

            let botonModificar = document.createElement("button");
            botonModificar.innerText = "Modificar";
            botonModificar.setAttribute("id","botonModificar");

            let botonDelete = document.createElement("button");
            botonDelete.innerText = "Delete";
            botonDelete.setAttribute("id","botonDelete");

            contenedorBotones.appendChild(botonModificar);
            contenedorBotones.appendChild(botonDelete);

            //////////////////////////////////////////////////////

            bodySelector.appendChild(contenedorPregunta);
            contenedorPregunta.appendChild(labelNumeroPregunta);
            contenedorPregunta.appendChild(listadoPreguntas);
            contenedorPregunta.appendChild(contenedorBotones);
        // })
}

async function botonModificarPregunta(){

    await entrarAlMenu()

        .then(() =>{

        })

}