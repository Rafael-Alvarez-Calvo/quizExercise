let bodySelector = document.querySelector("body");
let contenedorNickName = document.createElement("div");
let nickNameBox = document.createElement("input");
let registrarNick = document.createElement("button");

function pintarMenu(){

    contenedorNickName.setAttribute("id","contenedorNickName");

    nickNameBox.setAttribute("id","nickNameBox");
    nickNameBox.setAttribute("type","text");
    nickNameBox.value="asdad";
    // nickNameBox.setAttribute("value", "");

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
        contenedorNickName.className = "contenedorFadeOut";

        setTimeout(() =>{
            contenedorNickName.className = "contenedorHidden";
        },550)
        
        
        let newNickName = {

            Nick : getValueNick
            
        };

        fetch('http://localhost:8080/Player',{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({...newNickName})
        })
        .then(res => res.json())
        .then((puntuacion) =>{
            console.log(puntuacion);
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
    
        })

        // console.log(database)
        // let newPostKey = database.ref(`/Jugadores/Nick${getValueNick}`);
        // newPostKey.once("value", (value) => {
        //     if(value.val())
        //     {
        //         console.log("Ya estás registrado");
        //         //Cargas la partida
        //     }
        //     else {
        //         newPostKey.set(newNickName);
        //     }
        // });
        // return(newNickName); 
    });
    
}

registrarJugador();

function comenzarPartida(){
    
    document.getElementById("start").addEventListener("click", () =>{
        setTimeout(function(){

            window.location = "quiz.html";
            
        },500);
    })
}