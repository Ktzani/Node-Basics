const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const Slugify  = require("slugify");
const adminAuth = require ("../../middlewares/adminAuth")
//Gets
//adminAuth -> é o meu middleware que criei que funciona para acessar certas paginas apenas com login e é dessa maneira que eu o coloco. Antes de chegar
//na rota, ele faz a sua verificação para ver se o usuario está logado ou não
router.get("/admin/articles", adminAuth, (req, res) => {
    //include (option) -> indico para o sequelize que ele inclua tambem os dados do model Category. Isso é feito pelo relacionamento entre Article 
    //e Category. Assim agora tenho tuplas com os dados dos dois models em conjunto, sendo que ja fizemos a junção sem tuplas espurias 
    Article.findAll({
        include: {
            model: Category,
            required: true, 
        },
        order: [['id', 'ASC']]
    }).then(articles => {
        res.render("admin/articles/principal", {
            articles: articles
        });
    })
});

//TinyMCE -> principal biblioteca para ediçao de texto completo
router.get("/admin/articles/new", adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {
            categories: categories
        });
    })
});

router.get("/admin/articles/edit/:id", adminAuth, (req, res) => {
    let id = req.params.id

    if(isNaN(id)){
        res.redirect("/admin/categories")
    }
    
    Article.findByPk(id).then( (article) => {
        if(article != undefined){
            Category.findAll().then( categories => {
                if(categories != undefined){
                    res.render("admin/articles/edit", {
                        article: article,
                        categories: categories
                    });
                }
                else{
                    res.redirect("/admin/articles");
                }
            }).catch(error => {
                console.log(error)
                res.redirect("/admin/articles")
            })
        }
        else{
            res.redirect("/admin/articles")
        }
    }).catch(error => {
        console.log(error)
        res.redirect("/admin/articles")
    })
});

//Paginação
router.get("/articles/page/:num", (req, res) => {
    let page = req.params.num;
    let offset = 0;

    if(isNaN(page) || page == 1){
        offset = 0;
    }
    else{
        offset = (parseInt(page) - 1) * 4; //Converte de texto para um valor numerico
    }

    //Quando trabalhamos com findAndCountAll, ele retorna o count (quantidade de elementos) e as rows (os elementos em si, como uma lista de artigos)
    Article.findAndCountAll({
        limit: 4, //Quantidade de artigos por pagina
        offset: offset, //De onde começa a contagem e o select dos artigos 
        order: [
            ["id", "DESC"]
        ],
    }).then(articles => {
        let next;
        if (offset + 4 >= articles.count){
            next = false;
        }
        else{
            next = true;
        }

        let result = {
            page: parseInt(page),
            next: next,
            articles: articles, 

        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page", {
                result: result,
                categories: categories
            })
        })
    })
})

//Posts
router.post("/articles/save", adminAuth, (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category
    if(title != "") {
        Article.create({
            title: title,
            slug: Slugify(title), //Funçao que transforma o texto em um slug. Exemplo: //Desenvolvimento Web -> desenvolvimento-web
            body: body,
            categoryId: category
        }).then(() => {
            res.redirect("/admin/articles") ;
        });
    }

    else {
        res.redirect("/admin/articles");
    }
});

router.post("/articles/delete", adminAuth, (req, res) => {
    let id = req.body.id;
    if(id != undefined) {
        if(!isNaN(id)){
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles") 
            })
        }
        else{
            res.redirect("/admin/articles") 
        }
    }
    else {
        res.redirect("/admin/articles")
    }
});

router.post("/articles/update", adminAuth, (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let body = req.body.body
    let category = req.body.category
    
    Article.update({
        title: title,
        slug: Slugify(title),
        body: body,
        categoryId: category
    },
    {where:
        {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/articles")
    }).catch(error => {
        console.log(error)
        res.redirect("/admin/articles")
    })
});


module.exports = router;
