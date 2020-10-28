const firebase = require("firebase");
const fs = require("fs");

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

const http = require('http');

const listenPort = 8080;

const server = http.createServer((request, response) =>{

    const desbloqueoCORS = {
        'Access-Control-Allow-Origin': '*'
    };
    
    if(request.url === "/getJSON" ){

        // response.writeHead(200, {'Content-Type' :  'text.html'});
        response.writeHead(200, {...desbloqueoCORS,'Content-Type' :  'application/json'});
        
        let preguntas = database.ref('PreguntasQuiz/');
            preguntas.on("value",(snapshot) =>{

                contenido = snapshot.val();
                response.write(JSON.stringify(contenido));
                response.end();
                
            })
    }

    if(request.url === "/image"){

        response.writeHead(200,{...desbloqueoCORS, 'Content-Type' : 'application/json'});
        console.log(firebase)
        // let getImages = firebase.
        // storageBucket().ref('/').child(response);
        // getImages.getDownloadURL().then(url => console.log(url))
    }
    
});

server.listen(listenPort, () => console.log("listening on", listenPort));