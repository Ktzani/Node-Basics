const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require("body-parser");
const Post = require("./Models/Post")
// const { Sequelize } = require('sequelize'); // (TRANSFERIDO PARA O MODELS)

const port = 8080;

//1º CONFIG: temos que falar qual template engine queremos utilizar, que no caso é a handlebars. Por que? 
//Existem mts templates engine
    // Template Engine:
    app.engine('handlebars', handlebars.engine({defaultLayout:"main"})); //main == template padrão da aplicação
    app.set('view engine', 'handlebars');

    //Body Parser 
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    //Conectando ao banco de dados: (TRANSFERIDO PARA O MODELS)
    // const sequelize = new Sequelize('test', 'root', '09102001GCFO', { 
    //     host: "localhost", 
    //     dialect: 'mysql' 
    // });

//2º ROTAS: 
    //Rota principal
    app.get('/', (req, res) => {
        res.redirect('/cadastro');
    })

    //Rota para renderizar a pagina de formulario onde o usuário ira preencher os dados
    app.get('/cadastro', (req, res) => {
        res.render('formulario'); //Pegando o arquivo 'formulario' de handlebars e o colocando ele na rota
    })

    //Essa rota so poderá ser acessada quando houver uma requisição usando o metodo POST 
    //(que no caso é o nosso formulário, que envia dados usando o metodo POST)
    //Não é possivel acessa-la pela barra de URL
    app.post('/add', (req, res) => {
        // req.body.titulo ou req.body.conteudo //Dessa forma consigo pegar os dados que foram enviados no campo com o name 'titulo' ou 'conteudo'
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function() {
            res.redirect('/listaDePostagens'); //Fazendo um redirecionamento dentro do express assim que a Postagem for criada com sucesso
            // res.send("Postagem criada com SUCESSO!!")
        }).catch(function(erro){
            res.send("FALHA de criação da Postagem \n" + "Erro: " + erro)
        })
    })

    //Rota de redirecionamento onde serão listadas as postagens do banco
    app.get('/listaDePostagens', (req, res) => {
        //Retorna todos os posts que existem dentro da tabela Posts ordenado pelo id de forma decrescente
        Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
            //Com essa chave eu consigo passar qualquer tipo de dado para o handlebars
            res.render('home', {posts: posts}); 
        }); 
    })

    //Rota para deletar um post da tabela de postagens
    app.get("/deletar/:id", (req, res) =>{
        //Usado sempre para quando eu quero destruir um recurso dentro do banco de dados/tabela
        //Nesse caso irei deletar pelo seu numero de id que eu passei pela rota
        //Se existe um recurso dentro da tabela que tem o id = o que foi passado na rota, iremos deletar
        Post.destroy({where: {'id': req.params.id}}).then(function(){
            res.send("Postagem DELETADA com SUCESSO!");
        }).catch(function(erro){
            res.send("A postagem ao qual tentou DELETAR NÃO EXISTE!!");
        })
    }) 

    //Rotas para editar uma postagem, onde o usuario terá que digitar o titulo e o conteudo para isso
    app.get('/edit/:id', (req, res) => {
        Post.findByPk(req.params.id).then((post) => {
            res.render('form-edit', {
                id: post.id,
                titulo: post.titulo,
                conteudo: post.conteudo
            })
        }).catch((erro) => {
            res.send('Post não encontrado!' + erro)
        })
    })

    //Rota POST responsavel por realmente atualizar as colunas na tabela de postagens
    app.post('/editado/:id', (req, res) =>{
        Post.update({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        },
        {where: {id: req.params.id}}).then(function(){
            res.send("Postagem EDITADA com sucesso!")
        }).catch(function(erro){
            res.send("Erro ao editar postagem" + erro) 
        })
    })

app.listen(port, function(){
    console.log(`SERVIDOR CONECTADO na url http://localhost:${port}`);
}); //Para o servidor rodar, porém essa função tem que ser a ULTIMA do código