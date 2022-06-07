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
app.use(cors());

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

// app.use(require("./middlewares/user"));
app.use(require("./middlewares/validLogin"));



// ************ Router Define ************

const instrumentRouter = require("./routes/instrumentos.js");

app.use("/", instrumentRouter);

const users = require("./routes/user");

app.use("/usuarios", users);




