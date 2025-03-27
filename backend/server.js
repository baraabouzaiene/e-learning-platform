const express = require('express')
const app = express()
const port = 8000
const env=require("dotenv").config()

app.get('/get', (req, res) => {
  res.end('Hello World!')
})


// connect to database
// the name of the file
const connect=require('./connectdb');
connect();
app.use(express.json())// Allows handling JSON requests
const routeFormation=require("./routes/formationRoute")

app.use("/Formation",routeFormation)


const routeCours=require('./routes/coursRoute')
app.use("/Cours",routeCours)

const routeFormateur=require('./routes/formateurRoute')
app.use("/Formateur",routeFormateur)


const routeAdmin=require("./routes/adminRoute")
app.use("/Admin",routeAdmin)

const routeUser=require("./routes/userRoute")
app.use("/User",routeUser)

const routeEtudiant=require("./routes/etudiantRoute")
app.use("/Etudiant",routeEtudiant)


//image 
//bsh tet7at fil src fil <img>
app.get('/:img',(req,res)=>{
  res.sendFile(__dirname+"/storage/"+req.params.img)
})

// the last thing is listen
// start the server 
app.listen(port, () => {
  console.log(`Server is running please open at http://localhost/${port}`)
})