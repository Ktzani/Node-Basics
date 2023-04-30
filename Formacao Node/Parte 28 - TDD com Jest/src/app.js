const express = require('express');
let app = express(); 

app.get("/", (req, res) => {
    res.json({sucess: true})
})

app.get("/cor/:pessoa", (req, res) => {
    let pessoa = req.params.pessoa

    if(pessoa == "catiza"){
        res.json({cor: "Vermelho", color: "Red"})
    }
})

module.exports = app