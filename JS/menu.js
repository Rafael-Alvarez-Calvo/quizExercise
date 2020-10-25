
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
let bodySelector = document.querySelector("body");
let contenedorNickName = document.createElement("div");
let nickNameBox = document.createElement("input");
let registrarNick = document.createElement("button");

function pintarMenu(){

    contenedorNickName.setAttribute("id","contenedorNickName");

    nickNameBox.setAttribute("id","nickNameBox");
    nickNameBox.setAttribute("type","text");
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

        },600);

        let newNickName = {
            Nick : getValueNick   
        };

        let newPostKey = database.ref().child('Jugadores').push().getValueNick;

        let updates = {};
        updates['Jugadores/' + newPostKey] = newNickName;
        
        console.log(newNickName);

        return database.ref().update(updates); 
    });
    
}

registrarJugador();

// let Empezar = document.querySelector("button").addEventListener("click", function(){

//     setTimeout(function(){

//         window.location = "quiz.html";

//     },500);
// }) ;