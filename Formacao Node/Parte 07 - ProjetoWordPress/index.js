const express = require("express");
const app = express();
const session = require("express-session")

const bodyParser = require("body-parser");
const db = require("./database/database");

const categoriasController = require("./controllers/categories/CategoriesController");
const articlesController = require("./controllers/articles/ArticlesController");
const usersController = require("./controllers/users/UsersController")
const Category = require("./controllers/categories/Category");
const Article = require("./controllers/articles/Article");
const User = require("./controllers/users/User");


//View engine
app.set("view engine", "ejs");

//Sessions 
app.use(session({
    secret: "qualquercoisa",
    cookie: {
        maxAge: 3000000
    }
}))

//Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DataBase
db.connection
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados estabelecida");
    })
    .catch((error) => {
        console.log(error);
    });

//Controllers -> Primeiro temos um prefixo para acessar as rotas e em seguidas temos a route especifica
app.use("/", categoriasController);
app.use("/", articlesController);
app.use("/", usersController);

//Session -> todos os dados que forem passados para sessão serão salvos (na memoria do meu servidor) e poderão ser acessados GLOBALMENTE em qualquer 
//rota da minha aplicação. O sistema de login é o mais importante para se usar sessoes. 
// OBS: Não é bom utiliza-lo em sistemas de medio e grande porte, pois
//começam a ter mttts requisiçoes ao longo do tempo e toda requisicao feita pode gerar uma nova sessão e essa nova sessao ficara sendo salva na memoria 
//ram do computador. Logo, terá uma hora que a memoria ira estourar e nao dara mais conta da quantidade de sessões, travando todo servidor, travando a
//aplicação. Para isso mudamos um storage com um banco de dados de larga escala com um sistema distribuido, como REDIS
app.get("/session", (req, res) => {
    req.session.treinamento = "Formacacao node-js"
    req.session.ano = 2023
    req.session.user = {
        email:"catiza@gmail.com",
        username: "catiza2001",
        id: 10
    }

    res.send("Sessao gerada!")
})

app.get("/leitura", (req, res) => {
    res.json({
        treinamento: req.session.treinamento, 
        ano: req.session.ano,
        user: req.session.user
    })
})

app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ["id", "DESC"]
        ],
        limit: 4
    }).then((articles) => {
        Category.findAll().then(categories => {
            res.render("index", {
                articles: articles,
                categories: categories,
                perCategory: false
            })
        })
    })
})

app.get("/:slug", (req, res) => {
    let slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then( article => {
        if (article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {
                    article: article,
                    categories: categories
                })
            })
        }
        else {
            res.redirect("/")
        }
    }).catch( error => {
        console.log(error)
        res.redirect("/")
    })
})

app.get("/category/:slug", (req, res) => {
    let slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        }, 
        include: [{
            model: Article,
            as: "articles",
        }],
        order: [
            ['articles', 'id', 'DESC']
        ]
        
    }).then((category) => {
        if(category != undefined){
            Category.findAll().then( categories => {
                res.render("index", {
                    articles: category.articles, 
                    categories: categories,
                    perCategory: true
                });
            });
        }
        else {
            res.redirect("/")
        }
    }).catch(error => {
        console.log(error)
        res.redirect("/")
    })
})

app.listen(8080, () => {
    console.log("O servidor está rodando!");
});
