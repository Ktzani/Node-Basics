const express = require("express");
const router = express.Router();
const Slugify = require("slugify"); //Biblioteca responsavel de transformar o texto em um slug. Exemplo: //Desenvolvimento Web -> desenvolvimento-web
const Category = require("./Category");
const adminAuth = require("../../middlewares/adminAuth");

//Gets
router.get("/admin/categories/new", adminAuth, (req, res) => {
    res.render("admin/categories/new");
});

router.get("/admin/categories", adminAuth, (req, res) => {

    Category.findAll().then(categories => {
        res.render("admin/categories/principal", {
            categories: categories
        });
    });

    
})

router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/categories")
    }

    Category.findByPk(id)
        .then(category => {
            if(category != undefined){
                res.render("admin/categories/edit", {
                    category: category
                });
            }
            else{
                res.redirect("/admin/categories");
            }
        }).catch(error => {
            console.log(error)
            res.redirect("/admin/categories")
        });
    
});

//Posts
router.post("/categories/save", adminAuth, (req, res) => {
    let title = req.body.title;
    if(title != "") {
        Category.create({
            title: title,
            slug: Slugify(title) //Funçao que transforma o texto em um slug. Exemplo: //Desenvolvimento Web -> desenvolvimento-web
        }).then(() => {
            res.redirect("/admin/categories") ;
        });
    }

    else {
        res.redirect("/admin/categories/new");
    }
});

router.post("/categories/delete", adminAuth, (req, res) => {
    let id = req.body.id;
    if(id != undefined) {
        if(!isNaN(id)){
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories") 
            })
        }
        else{
            res.redirect("/admin/categories") 
        }
    }
    else {
        res.redirect("/admin/categories")
    }
});

router.post("/categories/update", adminAuth, (req, res) => {
    let id = req.body.id;
    let title = req.body.title;

    Category.update({
        title: title,
        slug: Slugify(title)
    },
    {where:
        {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/categories")
    }).catch(error => {
        console.log(error)
    })
});



module.exports = router;
