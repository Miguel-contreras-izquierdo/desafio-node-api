const { response, json } = require("express")
const express = require("express")
const app = express()
const port = 8000
const apiRouter = require("./routes/index")
const {logErrors, errorHandler} = require("./middlewares/errorHandlers")



// Llama a la función para conectar la base de datos, se llama en el listen (cuando se levanta el servidor)
const db = require("./lib/db")

// Muestra la información en formato json, parsea todoe el contenido JSON
app.use(express.json())

// Enviando al index de las rutas

apiRouter(app)

// Importando los modulos de middleware de errores/ el orden es importante, en ese orden se alinearan los middleware
app.use(logErrors)
app.use(errorHandler)


// Levantando la DB Mongo

app.listen(port, () =>{
    console.log("Listening on port:",port)
    db.connect()
    .then(()=>{
        console.log("DB connected")
    })
    .catch((error)=>{
        console.error("Connection refused",error)
    })
})
