const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/database");
const perguntasModel = require("./database/Pergunta");
const respostasModel = require("./database/Resposta");

const app = express();

//Testando conexão com o banco
db.connection
    .authenticate()
    .then(() =>{
        console.log("Conexão com o banco de dados feita");
    })
    .catch((msgErro) => {
       console.log(msgErro);
    });

//Estou falando para o express utilizar o EJS como View Engine
app.set('view engine', 'ejs');

//Aqui falo pro express em qual pasta colocarei meus arquivos estaticos (css, imagens, ...)
app.use(express.static('public'));

//Esse comando permite que os dados do formulario enviados sejam traduzidos pelo body-parser em uma estrutura javascript (decodificar os dados)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); //Permite ler dados de formulario enviados via json

// Rotas
app.get("/", (req, res) => {
    perguntasModel.findAll({order:[
       ['id', 'DESC'] //ASC -> crescente || DESC -> decrescente
    ]}).then((perguntas) => {
        res.render("index", {
            perguntas: perguntas
        })
    })
});

app.get("/perguntar",(req, res) => { 
    res.render("perguntar")
});

app.post("/salvarPergunta", (req, res) => { 
    let titulo = req.body.titulo; //Pegando dados do backend através de formulário
    let descricao = req.body.descricao;
    perguntasModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(() =>{
        res.redirect("/")
    })
}); 

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    perguntasModel.findOne({
        where: {id: id},
    }).then(pergunta => {
        if(pergunta != undefined){ //Pergunta encontrada. Caso contrario será nula 
            
            respostasModel.findAll({
                where: {idPergunta: pergunta.id},
                order:[
                    ['id', 'DESC'] //ASC -> crescente || DESC -> decrescente
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            })

        } else { 
            res.redirect("/");
        }
    })
});

app.post("/pergunta/:id/resposta", (req, res) => {
    // let idPergunta = req.params.id 
    //OUU tirando o id do input: eu crio um campo input hidden no formulario com o valor do id da pergunta
    let idPergunta = req.body.pergunta
    let corpo = req.body.corpo

    respostasModel.create({
        corpo: corpo,
        idPergunta: idPergunta
    }).then(() => {
        res.redirect("/pergunta/" + idPergunta)
    })
});

app.listen(8080, () => {
    console.log("App rodando");
});


//* Funcionamento de variaveis dentro do EJS
// app.get("/:nome/:lang", (req, res) =>{
//     let nome = req.params.nome
//     let lang = req.params.lang
//     let exibirMsg = false;

//     let produtos = [
//         {nome: "Doritos", preco: 3.14},
//         {nome: "Coca", preco: 5},
//         {nome: "Leite", preco: 1.45},
//         {nome: "Chips", preco: 15},
//         {nome: "Salgado", preco: 6},
//         {nome: "Toddy", preco: 4}
//     ]

//     res.render("index", {
//         nome: nome,
//         lang: lang,
//         empresa: "Guia do Catiza",
//         seguidores: "800",
//         msg: exibirMsg,
//         produtos: produtos
//     })
// });



//? <!-- <%= %> : Tag que tem como significado exibir o valor de uma variavel   -->
// <!-- <p>Nome: <%= nome %> </p> 
// <p>Linguagem: <%= lang%> </p>
// <p>Empresa: <%= empresa%></p>
// <p>Seguidores: <%= seguidores%></p>  -->

//!     <!-- Ensinando como usar if/else e foreach para o EJS -->
//     <!-- 
//     <% if(msg == true) { %>
//         <h3>Isso é uma msg de erro!</h3>
//     <%} else { %>
//         <h3>Nenhum erro!</h3>
//     <%}%>

//     <% produtos.forEach(function(produto) { %>
//         <hr>
//         <h3><%= produto.nome %></h3>
//         <h4><%= produto.preco %></h4>
//     <% }) %>     
//     --></hr>