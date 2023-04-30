const express = require('express')
const app = express()
const User = require("../services/UserService")

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/picsImage', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    // console.log("Banco de dados conectado")
}).catch((err) => {
    console.log(err)
})

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send("Hello World!");
})

app.post("/user", async (req, res) => {

    if(req.body.name == "" || req.body.email == "" || req.body.password == ""){
        res.status(400)
        return 
    }

    let resultEmailExistente = await User.EmailExistente(req.body.email)
    if(resultEmailExistente.status == true){
        res.status(400)
        res.json({error: resultEmailExistente.error})
        return 
    }
    
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    
    let result = await User.Create(user)

    if(result.status == true){
        res.status(200)
        res.json({email: req.body.email})
    }
    else{
        res.status(500)
        res.json({})
    }
})

module.exports = app