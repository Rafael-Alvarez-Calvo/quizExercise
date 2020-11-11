let bodySelector = document.querySelector("body");
let contenedorAvisoFalloRegistro = document.createElement("div");

let numero = 0;
let contador = 0;
let contadorPregunta = 0;
let contadorAvisoFalloRegistro = 0;
let category;

function pintarInicio(){

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

    let contenedorLoginRegister = document.createElement("div");
    contenedorLoginRegister.id = "contenedorLoginRegister";

    let linkToLogin = document.createElement("a");
    linkToLogin.href = "#";
    linkToLogin.id = "linkToLogin";
    linkToLogin.innerText = "LOG IN";

    let barraVSeparadora = document.createElement("p");
    barraVSeparadora.id = "barraVSeparadora"
    barraVSeparadora.innerText = "|";

    let linkToRegister = document.createElement("a");
    linkToRegister.href = "#";
    linkToRegister.id = "linkToRegister";
    linkToRegister.innerText = "REGISTER";
    linkToRegister.addEventListener("click", pintarRegistro);

    bodySelector.appendChild(contenedorLoginRegister);
    contenedorLoginRegister.appendChild(linkToLogin);
    contenedorLoginRegister.appendChild(barraVSeparadora);
    contenedorLoginRegister.appendChild(linkToRegister);

}

pintarInicio();

function pintarRegistro(){

    // preventDefault(); //prevenimos cualquier accion por defecto inicial de nuestro enlace

    document.querySelector("#contenedorLoginRegister").remove(); //Borramos el div que contiene a login y a register

    // Creamos formulaio de registro
    let formRegister = document.createElement("form");
    formRegister.id = "formRegister";

    // Creamos label e input del nombre de usuario
    let labelNickNameBox = document.createElement("label");
    labelNickNameBox.innerText = "Tu nombre de usuario:"
    let nickNameBox = document.createElement("input");
    nickNameBox.id = "nickNameBox";
    nickNameBox.type = "text";


    // Creamos label e input de email de usuario
    let labelEmailBox = document.createElement("label");
    labelEmailBox.innerText = "Tu email:";
    let emailBox = document.createElement("input");
    emailBox.id = "emailBox";
    emailBox.type = "email";


    //Creamos label e input de contraseña del usuario
    let labelPswBox = document.createElement("label");
    labelPswBox.innerText = "Tu contraseña:";
    let pswBox = document.createElement("input");
    pswBox.type = "password";
    pswBox.id = "pswBox";


    // Creamos el boton de registro
    let registrarUsuario = document.createElement("button");
    registrarUsuario.id = "registrarUsuario";
    registrarUsuario.innerText = "REGISTRARSE";
    registrarUsuario.addEventListener("click", registrarJugador)

    bodySelector.appendChild(formRegister);
    formRegister.appendChild(labelNickNameBox);
    formRegister.appendChild(nickNameBox);
    formRegister.appendChild(labelEmailBox);
    formRegister.appendChild(emailBox);
    formRegister.appendChild(labelPswBox);
    formRegister.appendChild(pswBox);
    formRegister.appendChild(registrarUsuario);

}

// pintarRegistro();

function registrarJugador(e){
    e.preventDefault();
    let getValueNick = document.getElementById("nickNameBox").value;
    let getValueEmail = document.getElementById("emailBox").value;
    let getValuePassword = document.getElementById("pswBox").value;
    
    let newNickName = {

        Nick : getValueNick,
        Email : getValueEmail,
        Psw : getValuePassword
        
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

                formRegister.className = "contenedorFadeOut";

                setTimeout(() =>{
                formRegister.className = "contenedorHidden";
                },550)

                setTimeout(() =>{

                    let divEmpezar = document.createElement("div");
                    divEmpezar.className = "divEmpezar";
                    bodySelector.appendChild(divEmpezar);
        
                    let entrarMenu = document.createElement("button");
        
                    entrarMenu.className = "entrarMenu"
                    entrarMenu.innerText = "ENTRAR AL MENU";
        
                    entrarMenu.setAttribute("id", "entrarMenu");
        
                    divEmpezar.appendChild(entrarMenu);
        
                    entrarMenu.addEventListener("click",entrarAlMenu);
        
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

                formRegister.className = "formRegister";
                AvisoFalloRegistroNickCaracteres();

                break;
        
        }
    })
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


// registrarJugador();

async function entrarAlMenu(){

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
        botonDeportes.addEventListener("click",()  => {
            category = "Deportes";
            QuestionsCall()
        });

        let botonCiencia = document.createElement("button");
        botonCiencia.innerText = "CIENCIA";
        botonCiencia.setAttribute("id", "Ciencia");
        botonCiencia.addEventListener("click", ()  => {
            category = "Ciencia";
            QuestionsCall()
        })

        let botonArte = document.createElement("button");
        botonArte.innerText = "ARTE";
        botonArte.setAttribute("id", "Arte");
        botonArte.addEventListener("click",()  => {
            category = "Arte";
            QuestionsCall()
        });

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
    contenedorPregunta.id = `ContenedorPregunta${data.id+1}`;

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
    botonDelete.addEventListener("click", botonDeleteListado)
    
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

    fetch('http://localhost:8080/AddQuestion',{
        method : "POST",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(newQuestion)
    })

    .then(res => res.json())

    .then((data) =>{

        if(data.status == "Created")

            actualizarListado();

    })
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

    .then((data) =>{

        if(data.status == "Created")
            actualizarListado();
                 
    })
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

async function botonDeleteListado(e){  //Delete question

    let response = await fetch("http://localhost:8080/Preguntas")

    response.json()

    .then(contenido =>{

        contenido.map(data =>{

            if(e.target.id === `botonDeleteP${data.id}`){

                let confirmDelete = confirm(`Estás seguro que deseas borrar la pregunta ${data.id + 1}, esta acción es irreversible`);

                if(confirmDelete === true){

                    let newID = {
                        id : data.id
                    };

                    fetch("http://localhost:8080/DeleteQuestion",{
                        method : "DELETE",
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify(newID)
                    })
    
                    .then(() =>{
    
                        document.querySelector(`#ContenedorPregunta${data.id+1}`).remove();
                        console.log(msg)
    
    
                    })
                }
            
            }
        })

    }) 
}

async function actualizarListado(){  //Preguntar porque no me actualiza con la pregunta que he añadido/modificado

    document.querySelectorAll("div").forEach(node =>{
        node.remove();  //Cogemos todos los div y los eliminamos al presionar el boton
    })

    let response = await fetch("http://localhost:8080/Preguntas")

    response.json()

    .then((contenido) =>{

        console.log(contenido);
        contenido.map(data =>{

            PintarPreguntasEditables(data);//Actualizamos la pantalla con las prguntas nuevas preguntas nuevas
        })
    })
}

async function getQuestions(category){
    console.log("Categoria", category)
    if (category){

        let res = await fetch(`http://localhost:8080/getQuestion/${category}`)
        let content = await res.json();

        return content;
    }
    return null;
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
    numeroPregunta.innerText = `Pregunta ${numero}`;

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
                
        
                setTimeout(() =>{
        
                    contadorPregunta++;
                    console.log(contadorPregunta);
                    console.log(contenido[contadorPregunta]);
                    console.log(contenido)

                    if(contadorPregunta < contenido.length){
                        
                        document.querySelector("form").remove();
                        document.querySelector("button").remove;
                        // QuestionCall();
                        QuestionsCall(category);
                        
                    }else{
                        
                        document.querySelector("form").remove();
                        document.querySelector("button").remove;
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
                        document.querySelector("button").remove;
                        QuestionsCall();
                        
        
                    }else{
        
                        document.querySelector("form").remove();
                        document.querySelector("button").remove;
                        
                    }
            
                }, 1000);
            
            }
        
        });
    })
    
    
}

async function QuestionsCall(){

    //removemos los div de categorias y de añadir preguntas
    document.querySelectorAll("div").forEach(node =>{
        node.remove();  
    })

    //Realizamos llamada asincrona de la funcion que comunica cvon el server para proporcionarnos las preguntas de deportes
    let Questions = await getQuestions(category);

    pintarPreguntas(Questions[contadorPregunta].P, Questions[contadorPregunta].Img);
    pintarRespuestas(Questions[contadorPregunta].R);

    comprobarResultado(Questions);

    //Creamos y damos funcionalidad al boton de volver atras
    let botonBackMenu = document.createElement("button");
    botonBackMenu.innerText = "MENÚ";
    botonBackMenu.id = "botonBackMenu";
    bodySelector.appendChild(botonBackMenu)

    botonBackMenu.addEventListener("click", () =>{

        setTimeout(() =>{

            document.querySelectorAll("div").forEach(node =>{
                node.remove();  
            })

            document.querySelector("form").remove();
            document.querySelector("#botonBackMenu").remove();

            numero = 0;
    
            entrarAlMenu();

        },500)
    })
}
