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
            
                        comenzarPartida();
            
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

                    // let PulsarBoton = document.getElementById("registrarNick").addEventListener("click", () =>{

                    

                    
                        // })


                    // if(AvisoFalloRegistroNickCaracteres()){

                    //     

                    //     

                        
                    // }
                    
                        // contadorAvisoFalloRegistro --;
                        // contadorAvisoFalloRegistro = 0;

                        // if(contadorAvisoFalloRegistro == 0){

                        //     setTimeout(() =>{
    
                        //         AvisoFalloRegistroNickCaracteres();
    
                        //     },100);

                        // }

                        // setTimeout(() =>{

                        //     AvisoFalloRegistroNickCaracteres();

                        // },100);
                        
                    


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

function comenzarPartida(){
    
    document.getElementById("start").addEventListener("click", () =>{
        setTimeout(function(){

            window.location = "quiz.html";
            
        },500);
    })
}