const express = require("express");
const base64 = require("base-64");
// const { check, validationResult } = require('express-validator');
const bodyParser = require("body-parser");
const cors = require("cors");
const firebase = require("firebase");
const cookieParser = require("cookie-parser");
const crypto = require("crypto"); //viene por defecto conNodeJs
const { header } = require("express-validator");
// const { contextsKey } = require("express-validator/src/base");
const dotenv = require("dotenv").config();

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
const PORT = process.env.PORT || 8080;
server.use(cors());
server.use(bodyParser.json());
server.use(cookieParser());

//Setting public directories
server.use(express.static("../quizExercise"));

// const SECRET = crypto.randomBytes(50).toString("hex");
const SECRET = process.env.SECRET;
//preguntar que son los archivos .env no se entiende y donde dice que deberia estar

//Regex

let validateNick = / ^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/g

let validateEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g

let validatePsw = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/g


//Funciones
function parseBase64(base64String) {

    const parsedString = base64String.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_").toString("base64");
    //Reemplazamos el = + \  que pueda contener nuestro string y los sustituimos por sin espacio - _ respectivamente  
    return parsedString;
}
function encodeBase64(string) {
    const encodedString = base64.encode(string); //encodeamos nuestro string en base64
    const parsedString = parseBase64(encodedString); //parseamos nuestro string en base64
    return parsedString;
}

function decodeBase64(base64String) {
    const decodedString = base64.decode(base64String); //PORQUE HAY QUE DECODEARLO
    return decodedString;
}

function hash(string, key = SECRET) {
    const hashedString = parseBase64(crypto.createHmac("sha256", key).update(string).digest("base64"));
    //debemos hashear nuestro parseado
    //hmac es un algoritmo de hashing combinado con una contraseña
    return hashedString;
}

function generateJWT(Payload) {
    const header = {
        "alg": "HS256", //esto es obligatorio que coincida con el hash?
        "typ": "JWT"
    };

    const base64Header = encodeBase64(JSON.stringify(header));
    const base64Payload = encodeBase64(JSON.stringify(Payload));
    const signature = parseBase64(hash(`${base64Header}.${base64Payload}`));

    const JWT = `${base64Header}.${base64Payload}.${signature}`;
    return JWT;
}

function verifyJWT(jwt) {
    const [header, payload, signature] = jwt.split(".");
    if (header && payload && signature) {
        const expectedSignature = parseBase64(hash(`${header}.${payload}`));
        if (expectedSignature === signature)
            return true;
    }
    console.log("No")
    return false;
}

function getJWTInfo(jwt) {
    const payload = jwt.split(".")[1];
    if (payload) {
        try {
            const data = JSON.parse(decodeBase64(payload));
            return data;
        }
        catch (e) {
            return null;
        }
    }
    return null;
}

function encryptPassword(string, salt = crypto.randomBytes(128).toString("hex")) {
    let saltedPassword = hash(salt + string + salt, SECRET);
    return { password: saltedPassword, salt };
}

function verifyPassword(string, realPassword) {
    return encryptPassword(string, realPassword.salt).password === realPassword.password;

}

//Endpoints

server.get("/Preguntas", (req,res) =>{

    let preguntas = database.ref('PreguntasQuiz/');
            preguntas.once("value",(dbData) =>{

                contenido = dbData.val();
                if (contenido)
                    res.send(contenido);
                else
                    res.send([]);

            })
});

server.get("/getQuestion/:category", (req, res) => {

    let myCategories = req.params.category;

    let DBref = database.ref("/PreguntasQuiz");

    // if(myCategories === "JSCorrect"){

    DBref.orderByChild("Cat").equalTo(myCategories).once("value", (data) =>{
        content = data.val();
        if (content)
        {
            // console.log(Object.values(content).filter(el => el));
            res.send(Object.values(content).filter(el => el)); //el filter va a eliminar del array todo lo que de NaN, Undefined, Null, 0,....
        }
        else{
            res.send({msg : "No existen preguntas de esta categoria"})
        }
    })
})

server.get("/VerifyJWT", (req,res) =>{

    let JWT = req.cookies.JWT;

    if (JWT) {
        //If the JWT was verified, I sent them the info, if not, clear the cookie
        if (verifyJWT(JWT)){

            res.cookie("jwt", JWT, { httpOnly : true});
            res.send(getJWTInfo(JWT));
            
            //httpOnly evita que si alguien quiere ver nuestra cookie con document.}cookie, no pueda verla
        }
        else {
            res.clearCookie("jwt");
            res.send({ msg: "invalid session" });
        }
    }

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
        let misRespuestas = req.body.R;
        let miRespuestaCorrecta = req.body.RespuestaCorrecta;
        let miAutor = req.body.Autor;
        
        let DBRef = database.ref(`/PreguntasQuiz/`);
        DBRef.once("value", (dbData) =>{

            let id = dbData.val() ? dbData.val().length : 0; //Si hay datos añade id respecto al largo de la data sino hay data el id seria 0

            DBRef.child(id).set({P : miPregunta, R : misRespuestas , RespuestaCorrecta : miRespuestaCorrecta, Autor : miAutor, id})
            .then(() => {

                res.send({status: "Created"});

            })
                
            // res.send({status: (data == null ? "Created" : "Error")})
        });

        //to Do catch por si se queda pillada la base de datos
    }
    else {

        res.send({status: "Invalid"});
    }

});



server.post("/SignUp",(req, res) => {

    if(req.body !== null){

        let scoreCat = {"HTMLCorrect": 0, "CssCorrect": 0, "JSCorrect": 0};
        let playerDB = {scoreCat, ...req.body};

        console.log(playerDB);

        if(req.body.Nick === validateNick)
            res.send({msg : "ValidNick"})
        else
            res.send({msg : "invalidNick"})

        if(req.body.Email === validateEmail)
            res.send({msg : "ValidEmail"})
        else
            res.send({msg : "invalidEmail"})

        if(req.body.Psw === validatePsw)
            res.send({msg : "ValidPsw"})
        else
            res.send({msg : "invalidPsw"})

        if(req.body.Nick === validateNick && req.body.Email === validateEmail && req.body.Psw === validatePsw){

            let payload = { // este parametro se añade como parametro en la funcion generateJWT contiene los datos de nuestra sesion, es el contenido de la cookie
                
                "Nick" : req.body.Nick,
                "Email" : req.body.Email,
                // "Psw" : req.body.Psw,  nunca se pasa la contraseña en el cuerpo de la cookie
                "ScoreCat" : scoreCat,
                "iat" : new Date().setMilliseconds(30000)
            }
    
            // console.log(payload);
            
    
            if(payload){
    
                // encryptPassword(payload.Psw);
    
                // console.log(`"${SECRET}"`);
    
                let temporaryJWT = generateJWT({payload, ip : req.ip}); // req ip evita que cualquier persona que nos ataque sino esta en el ordenador de la persona a la que le hemos dado el token, no le será valido// Porque se añade como clave aqui y no en el payload
    
                res.send(temporaryJWT);
    
                // console.log(JWT);
    
                let playerRef = firebase.database().ref(`/Jugadores/${playerDB.Nick}`);
                playerRef.once("value", (dbData) => {
        
                    let data = dbData.val();
        
                    if  (data === null || (playerDB.HTMLCorrect >= data.HTMLCorrect && playerDB.CssCorrect >= data.CssCorrect && playerDB.JSCorrect >= data.JSCorrect && (playerDB.HTMLCorrect > data.HTMLCorrect || playerDB.CssCorrect > data.CssCorrect || playerDB.JSCorrect > data.JSCorrect)))
                    {
                        playerRef.set(playerDB);
                        res.send({status: (data == null ? "Created" : "Updated"), ...playerDB})
                    }
                    else
                    {
                        console.log("Error");
                        res.send({status: "Error", ...data});
                    }
                });
            }
        }



    }
    else {
        res.send({status: "Invalid"});
    }
})

server.post("/LogIn", (req, res) =>{

    let myEmail = req.body.Email;
    let myPsw = req.body.Psw;    
    
    let userRef = database.ref("Jugadores/");

    userRef.once("value", (dbData) => {

        const dbPlayers = Object.values(dbData.val());

        let i = 0;

        while (dbPlayers[i] && !((dbPlayers[i].Email === myEmail || dbPlayers[i].Nick === myEmail) && dbPlayers[i].Psw === myPsw)) {
            i++;
        }

        if (dbPlayers[i])
            console.log("Found", dbPlayers[i]);
        else
            console.log("User not found")

    })
})

//PUT:

server.put("/EditQuestion",(req,res) => {

    console.log("req", req.body);

    if(!req.body.id){

        res.send({msg : "error"});

    }else{
        
        let preguntas = database.ref(`PreguntasQuiz/${req.body.id}`);
                preguntas.once("value",(dbData) =>{
    
                    let miPregunta = req.body.P;
                    let misRespuestas = req.body.R;
                    let miRespuestaCorrecta = req.body.RespuestaCorrecta;
    
                    contenido = dbData.val();
                    
                    let updatedQuestion = {};
    
                    if(miPregunta && miPregunta !== contenido.P)
                    {
                        updatedQuestion.P = miPregunta;
                    }
    
                    if (misRespuestas && JSON.stringify(misRespuestas) !== JSON.stringify(contenido.R))
                    {
                        updatedQuestion.R = misRespuestas;
                    }
    
                    if (miRespuestaCorrecta && miRespuestaCorrecta !== contenido.RespuestaCorrecta)
                    {
                        updatedQuestion.RespuestaCorrecta = miRespuestaCorrecta;
                    }
    
    
                    if (miPregunta && miPregunta !== contenido.P || misRespuestas && JSON.stringify(misRespuestas) !== JSON.stringify(contenido.R) || miRespuestaCorrecta && miRespuestaCorrecta !== contenido.RespuestaCorrecta){
    
                        preguntas.update(updatedQuestion)

                        .then(() =>{

                            res.send({msg: "Updated", question: updatedQuestion});

                        })
                    }
                    else{
                        res.send({msg: "Not Updated"});
                    }     
        })
    }
})

// DELETE endpoints

server.delete("/DeleteQuestion", (req,res) =>{
    
    let preguntas = database.ref(`PreguntasQuiz/${req.body.id}`);
    preguntas.once("value",(dbData) =>{

        miPregunta = req.body.id;

        contenido = dbData.val();

        if(miPregunta === contenido.id){

            preguntas.remove();

            let preguntasActualizadas = database.ref(`PreguntasQuiz/${req.body.id}`);
            preguntasActualizadas.once("child_changed", (dbData) =>{

                contenidoActualizado = dbData.val();

                // contenidoActualizado--;
            })
            contenido

            res.send({msg : "Deleted"});

        }else{

            res.send({msg : "Nothing to delete"});
        }

    })

})

//Instantiate server
server.listen(PORT, () => console.log("Listening on port", PORT))