const mongoose = require('mongoose');

const articleModel = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    date: {
        type: Date,
        default: Date.now
    },
    special: Boolean,
    resume: {
        content: String,
        author: String
    }
})

//IMPORTANTE: nao é necessario fazer a sincronizaçao da coleção para cria-la. Apenas de inserir um dado nela, ela sera sincronizada com o banco

//OBS: Automaticamente o mongo reconhece que a collection que estou usando deve ser colocada no plural, ou seja, coloca o nome Article como 
//Articles
module.exports = mongoose.model("Article", articleModel)