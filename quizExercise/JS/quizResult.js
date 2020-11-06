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
    addQuestion.setAttribute("id","addQuestion")
    addQuestion.value = "jandmnakmd";
    addQuestionLabel.appendChild(addQuestion);

    for(i = 0 ; i < inputsAddAnswers.length; i++){

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

    document.getElementById("botonRegistrarPregunta").addEventListener("click", (e) =>{
        e.preventDefault();
        let getQuestion = document.getElementById("addQuestion").value;
        let getAnswers = [...document.querySelectorAll("#Respuesta")];
        let getCorrectAnswer = document.getElementById("respuestaCorrecta").value;
        let getAutor = document.getElementById("autor").value;

        console.log(getAnswers.map(el => el.value));            
        let newQuestion = {

            P : getQuestion,
            R : getAnswers.map(el => el.value),
            RespuestaCorrecta : getCorrectAnswer,
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
        
        
    })



    

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

pintarQuizResult();