const express = require("express");
const { check, validationResult } = require('express-validator');
const bodyParser = require("body-parser");
const cors = require("cors");
const firebase = require("firebase");

//Initialize Firebase
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

//Express setup
const server = express();
const PORT = 8080;
server.use(cors());
server.use(bodyParser.json());

//Setting public directories
server.use(express.static("../quizExercise"));

//Endpoints




server.get("/Preguntas", (req,res) =>{

    let preguntas = database.ref('PreguntasQuiz/');
            preguntas.on("value",(snapshot) =>{

                contenido = snapshot.val();
                
                res.send(contenido);
    })
})

//POST

/*
* /Player puede devolver un json en el que indique:
* Created   ->    Se ha creado un nuevo usuario
* Updated   ->    Se han actualizado los datos
* Error     ->    Ha ocurrido un error (hay puntuación más baja que antes)
* Invalid   ->    El nombre de usuario es invalido
*/
server.post("/AddQuestion",(req, res) =>{

    if(req.body !== null){

        let miPregunta = req.body.P;
        let misRespuestas = {R: [req.body.R]};
        let miRespuestaCorrecta = req.body.RespuestaCorrecta;
        let miAutor = req.body.Autor;
        

        let DBRef = database.ref(`/PreguntasQuiz/Pregunta de ${miAutor}`);
        DBRef.on("value", (dbData) =>{

            let data = dbData.val();

            if(data === null){

                DBRef.set({P : miPregunta, R : misRespuestas , RespuestaCorrecta : miRespuestaCorrecta, Autor : miAutor});
                console.log(misRespuestas);
                console.log(miPregunta);
                console.log(miRespuestaCorrecta);
                // res.send({status: (data == null ? "Created" : "Error")})
            }
            else{

                DBRef.set({P : miPregunta, R : [misRespuestas] , RespuestaCorrecta : miRespuestaCorrecta, Autor : miAutor});
                // res.send({status: "Error"});

            }

        })
    }
    else {

        res.send({status: "Invalid"});
    }




})

server.post("/Player",[
    check('Nick')
        .isLength({min : 3 , max :8})
        // .isAlphanumeric("en-US")
    ], (req, res) => {

    // let miNick = req.body.Nick;
    // console.log(miNick);
    const errors = validationResult(req);

    if (errors.isEmpty())
    {
        let player = {"Arte": 0, "Ciencia": 0, "Deportes": 0, ...req.body};
        console.log(player);

        let playerRef = firebase.database().ref(`/Jugadores/${player.Nick}`);
        playerRef.once("value", (dbData) => {

            let data = dbData.val();
            console.log(data);

            if  (data === null || (player.Arte >= data.Arte && player.Ciencia >= data.Ciencia && player.Deportes >= data.Deportes && (player.Arte > data.Arte || player.Ciencia > data.Ciencia || player.Deportes > data.Deportes)))
            {
                playerRef.set(player);
                res.send({status: (data == null ? "Created" : "Updated"), ...player})
            }
            else
            {
                console.log("Error");
                res.send({status: "Error", ...data});
            }
        });
    }
    else {
        res.send({status: "Invalid"});
    }
})

//Instantiate server
server.listen(PORT, () => console.log("Listening on port", PORT))