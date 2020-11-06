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

    document.getElementById("start").addEventListener("click", () =>{

        setTimeout(() =>{

            // window.location = "quiz.html";
            document.querySelectorAll("div").forEach(node =>{
                node.remove();  
            })

            let categoriasTitulo = document.createElement("h1");
            categoriasTitulo.innerText = "Elige categoria";
            bodySelector.appendChild(categoriasTitulo);

            let contenedorCategorias = document.createElement("div");
            
            let botonDeportes = document.createElement("button");
            botonDeportes.innerText = "DEPORTES";
            botonDeportes.setAttribute("id", "Deportes");

            let botonCiencia = document.createElement("button");
            botonCiencia.innerText = "CIENCIA";
            botonCiencia.setAttribute("id", "Ciencia");

            let botonArte = document.createElement("button");
            botonArte.innerText = "ARTE";
            botonArte.setAttribute("id", "Arte");

            bodySelector.appendChild(contenedorCategorias);
            contenedorCategorias.appendChild(categoriasTitulo);
            contenedorCategorias.appendChild(botonDeportes);
            contenedorCategorias.appendChild(botonCiencia);
            contenedorCategorias.appendChild(botonArte);

            let contenedorModificarPreguntas = document.createElement("div");

            let modPreguntaLabel = document.createElement("h3");

            modPreguntaLabel.innerText = "¿Te gustaría modificar, añadir o borrar alguna pregunta?";

            let botonIrModPreguntas = document.createElement("button");
            botonIrModPreguntas.innerText = "Modificar/Añadir/Borrar Pregunta";
            botonIrModPreguntas.setAttribute("id", "botonIrModPreguntas")

            bodySelector.appendChild(contenedorModificarPreguntas);
            contenedorModificarPreguntas.appendChild(modPreguntaLabel);
            contenedorModificarPreguntas.appendChild(botonIrModPreguntas);

            document.getElementById("botonIrModPreguntas").addEventListener("click", async() =>{

                PintarFormAñadirPregunta();

                let response = await fetch("http://localhost:8080/Preguntas")  //esperamos respuesta del  server

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
    
}

async function PintarFormAñadirPregunta(){

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
    // addQuestion.value = "jandmnakmd";
    addQuestionLabel.appendChild(addQuestion);

    for(i = 0 ; i < numeroRespuestas; i++){

        let inputsAnswers = document.createElement("input");
        inputsAnswers.placeholder = "Introduce una respuesta aquí";
        inputsAnswers.setAttribute("type", "text");
        inputsAnswers.setAttribute("class", "Respuesta");
        inputsAnswers.value = "jandmafag<axnakmd";
        formulario.appendChild(inputsAnswers);

    }

    let labelSelectCorrectAnswer = document.createElement("label");
    labelSelectCorrectAnswer.innerText = "Aquí la respuesta correcta";

    let selectCorrectAnswer = document.createElement("select");
    selectCorrectAnswer.setAttribute("id", "selectRespuestaCorrecta");
    // selectCorrectAnswer.setAttribute("type", "text");
    formulario.appendChild(labelSelectCorrectAnswer);
    formulario.appendChild(selectCorrectAnswer);

    for(i = 0 ; i < numeroRespuestas; i++){

        let correctAnswers = document.createElement("option");
        correctAnswers.innerText = i;
        correctAnswers.value = i;
        correctAnswers.id = `RC${i}`;
        selectCorrectAnswer.appendChild(correctAnswers);

    }

    let autor = document.createElement("input");
    autor.placeholder = "Autor de la pregunta";
    // autor.value = "Rafa";
    autor.setAttribute("id", "autor");
    autor.setAttribute("type", "text");
    formulario.appendChild(autor);


    let botonRegistrarPregunta = document.createElement("button");
    botonRegistrarPregunta.innerText = "Envía tu pregunta";
    botonRegistrarPregunta.id = "botonRegistrarPregunta";
    botonRegistrarPregunta.dataset.action = "botonRegistrarPregunta";
    formulario.appendChild(botonRegistrarPregunta);
    botonRegistrarPregunta.addEventListener("click", e =>{
        if(e.target.dataset.action === "botonRegistrarPregunta"){
            botonAñadirPreguntaForm(e);
        }

        if(e.target.dataset.action === "botonModPForm"){

            botonModPreguntaForm(e);
            
        }
    })

}

async function PintarPreguntasEditables(data){

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
    botonModificar.id = `botonModificarP${data.id}`;
    botonModificar.addEventListener("click", botonModificarPreguntaListado);
    
    let botonDelete = document.createElement("button");
    botonDelete.innerText = "Delete";
    botonDelete.setAttribute("id",`botonDeleteP${data.id}`);
    // botonDelete.addEventListener("click", DeletePregunta)
    
    contenedorBotones.appendChild(botonModificar);
    contenedorBotones.appendChild(botonDelete);

    //////////////////////////////////////////////////////

    bodySelector.appendChild(contenedorPregunta);
    contenedorPregunta.appendChild(labelNumeroPregunta);
    contenedorPregunta.appendChild(listadoPreguntas);
    contenedorPregunta.appendChild(contenedorBotones);

}

function botonAñadirPreguntaForm(e){

    e.preventDefault();

    let getQuestion = document.getElementById("addQuestion").value;
    let getAnswers = [...document.querySelectorAll(".Respuesta")];
    let getCorrectAnswer = document.querySelectorAll("#selectRespuestaCorrecta option");
    let correctAnswer;

    getCorrectAnswer.forEach((el, i) => {
        if (el.selected)
            correctAnswer = i;
        console.log(el.selected);
    })
    //document.getElementById(`RC${e.target.id}`).selected(true);
    let getAutor = document.getElementById("autor").value;

    // console.log(getAnswers.map(el => el.value));         
    let newQuestion = {

        P : getQuestion,
        R : getAnswers.map(el => el.value),
        RespuestaCorrecta : correctAnswer,
        Autor : getAutor
    }
    console.log(newQuestion);
    fetch('http://localhost:8080/AddQuestion',{
        method : "POST",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(newQuestion)
    })

    .then(res => res.json())
}
function botonModPreguntaForm(e){

    e.preventDefault();
    let getQuestion = document.getElementById("addQuestion").value;
    let getAnswers = [...document.querySelectorAll(".Respuesta")];
    let getCorrectAnswer = document.querySelectorAll("#selectRespuestaCorrecta option");
    let correctAnswer;

    getCorrectAnswer.forEach((el, i) => {
        if (el.selected)
            correctAnswer = i;
        console.log(el.selected);
    })

    let getAutor = document.getElementById("autor").value;

    // console.log(getAnswers.map(el => el.value));         
    let newQuestion = {

        P : getQuestion,
        R : getAnswers.map(el => el.value),
        RespuestaCorrecta : correctAnswer,
        Autor : getAutor,
        id: sessionStorage.getItem("Id")
            
    }

    fetch('http://localhost:8080/EditQuestion',{
        method : "PUT",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(newQuestion)
    })

    .then(res => res.json())
}

async function botonModificarPreguntaListado(e){

    let response = await fetch("http://localhost:8080/Preguntas") //esperamos respuesta del  server

    response.json() //esperamos un json del server

    .then((contenido) =>{

        contenido.map(data =>{
            // console.log(data);
            if(e.target.id === `botonModificarP${data.id}`){

                addQuestion.value = data.P;
                let inputsAnswers = document.querySelectorAll(".Respuesta");

                data.R.map((d, i) =>{
                    inputsAnswers[i].value = d;
                })
                sessionStorage.setItem("Id", data.id);
                document.querySelector("#selectRespuestaCorrecta").value = data.RespuestaCorrecta;

                document.querySelector("#autor").value = data.Autor;

                document.querySelector("#botonRegistrarPregunta").innerText = "Modificar";
                document.querySelector("#botonRegistrarPregunta").dataset.action = "botonModPForm";


            }

        })
    })

}