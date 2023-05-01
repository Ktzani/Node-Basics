require('dotenv').config();
const express = require('express')
const app = express()
const User = require("../services/UserService")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const mongoose = require('mongoose')
const UserService = require('../services/UserService');

let secret = "eqwdqf3q123feg326tgwrg23f"

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

app.delete("/user/:email", async (req, res) => {
    let result = await UserService.Delete(req.params.email)

    if(result.status){
        res.status(200)
        res.json({message: "Usuario deletado do banco"})
    }
    else{
        res.status(500)
        res.json({})
    }
})

app.post("/auth", async (req, res) => {
    let {email, password} = req.body

    if(email == "" || password == ""){
        res.status(400)
        return 
    }

    let result = await User.EmailExistente(email)
    let user = result.user

    console.log(user)
    
    if(user != {}){
        let correctPass = await bcrypt.compare(password, user.password)
        if(correctPass){
            let token = jwt.sign({email: user.email, name: user.name, id: user._id}, secret, {expiresIn: '48h'})

            if(token){
                res.status(200)
                res.json({status: "Tudo OK", token: token})
                return
                
            }
            else{
                res.status(500)
                res.json({error: "Problema na geração do token"})
                return
            }
            
        }
        else{
            res.status(406)
            res.json({error: "Senha incorreta"})
        }
    }
    else{
        res.status(404)
        res.json({error: "Usuário não encontrado"})
    }

})

module.exports = app