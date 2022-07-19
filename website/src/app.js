// ************ Require's ************

const express = require('express');
const path = require('path');
const app = express();
const validator = require('express-validator');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');


// ************ Session ************


app.use(session({
    secret: 'Juanjo campeón',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 2000000}
}))



// ************ Data Configuration ************

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true}));
app.use(express.json())

//CORS

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     console.log("headers entre")
//     next();
// });

// ************ Servidor ************

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => console.log("Server start in http://localhost:"+app.get("port")));



// ************ Acceso Publico ************

app.use(express.static(path.resolve(__dirname, "../public/uploads/users"))); 
app.use(express.static(path.resolve(__dirname, "../public/uploads/instruments")));

// ************ API's ************

const apiInstrumentos = require("./routes/apiInstrumentos");

app.use("/instrumentos", apiInstrumentos)

const apiUsers = require("./routes/apiUser.js");

app.use("/user", apiUsers);

// ************ Middleware Customs ************



// ************ Router Define ************

const instrumentRouter = require("./routes/instrumentos.js");

app.use("/", instrumentRouter);

const users = require("./routes/user");

app.use("/usuarios", users);




