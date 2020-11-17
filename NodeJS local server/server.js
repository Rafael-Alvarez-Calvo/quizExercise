const express = require("express");
const base64 = require("base-64");
// const { check, validationResult } = require('express-validator');
const bodyParser = require("body-parser");
const cors = require("cors");
const firebase = require("firebase");
const cookieParser = require("cookie-parser");
const crypto = require("crypto"); //viene por defecto conNodeJs
// const { contextsKey } = require("express-validator/src/base");

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
server.use(cookieParser());

//Setting public directories
server.use(express.static("../quizExercise"));

// const SECRET = crypto.randomBytes(50).toString("hex");
const SECRET = "50f6efe8fe36647122e412c70cecb853e94c498a8043e9d39d9b99320fac00ef52667f2ea0f67a870d8f70739971444eedd8";
//preguntar que son los archivos .end o .length no se entiende y donde dice que deberia estar


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


        let payload = { // este parametro se añade como parametro en la funcion generateJWT contiene los datos de nuestra sesion, es el contenido de la cookie
            
            "Nick" : req.body.Nick,
            "Email" : req.body.Email,
            "Psw" : req.body.Psw,
            "ScoreCat" : scoreCat,
            "iat" : new Date()
        }

        // console.log(payload);
        

        if(payload){

            // encryptPassword(payload.Psw);

            // console.log(`"${SECRET}"`);

            let JWT = generateJWT({payload, ip : req.ip}); // req ip evita que cualquier persona que nos ataque sino esta en el ordenador de la persona a la que le hemos dado el token, no le será valido// Porque se añade como clave aqui y no en el payload

            // console.log(JWT);

            res.cookie("jwt", JWT, { httpOnly : true});
            //httpOnly evita que si alguien quiere ver nuestra cookie con document.cookie, no pueda verla

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
    else {
        res.send({status: "Invalid"});
    }
})

server.post("/LogIn", (req, res) =>{

    let myEmail = req.body.Email;
    let myPsw = req.body.Psw;
    let JWT = req.cookies.jwt;    
    
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