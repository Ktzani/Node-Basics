const mongoose = require('mongoose');
const Article = require('./article');

mongoose.connect("mongodb://localhost:27017/aprendendoMongo", {useNewUrlParser: true, useUnifiedTopology: true});

//TODO Retornando todos os artigos
Article.find({}).then(articles => {
    console.log(articles)
}).catch(err => {
    console.log(err)
})

//! Retornando o artigo por uma comparação especifica
// Article.find({"_id":"644865830c067e68d25d23d2", "title": "God of War"}).then(article => {
//     console.log(article)
// }).catch(err => {
//     console.log(err)
// })

//*Retornando buscas aninhadas
// Article.find({"resume.content":"Um jogo mtt foda"}).then(article => {
//     console.log(article)
// }).catch(err => {
//     console.log(err)
// })

//? Retornando um artigo por vez: findOne pega o primeiro registro que bater com essa condição
// Article.findOne({"resume.content":"Um jogo mtt foda"}).then(article => {
//     console.log(article)
// }).catch(err => {
//     console.log(err)
// })

//! Deletando um artigo pelo id
// Article.findByIdAndDelete("64485416658038ce0d8e2491").then(()=> {
//     console.log("Artigo Deletado")
// }).catch(err => { 
//      console.log(err)
// })


Article.findByIdAndUpdate("6448682e4d609bef4dbf28ce", {
    title: "GTA 5",
    author: "RSN",
    body: "Jogo de roubar e matar",
    special: false,
    resume: {
        content: "Um jogo daora e velho",
        author: "Person"
    }
}).then(()=>{
    console.log("Artigo Atualizado")
})


//TODO Criando um novo artigo
// let artigo = new Article({
//     title: "God of War",
//     author: "Joao",
//     body: "Jogo de deuses em uma guerra infinita pelo olimpico",
//     special: true,
//     resume: {
//         content: "Um jogo mtt foda",
//         author: "Joao"
//     }
// })

// artigo.save().then(()=> { 
//     console.log("Artigo Salvo")
// }).catch(err => {
//     console.log(err)
// })