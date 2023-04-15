const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const adminAuth = require("../../middlewares/adminAuth");
const Category = require("../categories/Category");


//Gets
router.get("/admin/users", adminAuth, (req, res) => {
    User.findAll().then((users) => {
        res.render("admin/users/principal", {
            users: users,
        });
    });
});

router.get("/admin/users/create",adminAuth, (req, res) => {
    res.render("admin/users/create");
});

router.get("/login", (req, res) => {
    if(req.session.user != undefined){
        res.redirect("/admin/articles")
    }

    Category.findAll().then( categories => {
        res.render("admin/users/login", {
            categories: categories
        });
    })
});

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/")
});


//Posts
router.post("/users/create", adminAuth, (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
        where: {
            email: email,
        },
    }).then((user) => {
        if (user == undefined) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                password: hash,
            })
                .then(() => {
                    res.redirect("/admin/users/");
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect("/admin/users/");
                });
        } else {
            res.redirect("/admin/users/create");
        }
    });

    // res.json({email, password}); //Sempre testar essas requisicoes para ver se os dados estao chegando ou nao
});

router.post("/authenticate", (req, res) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({
        where: {email: email}
    }).then(user => {
        if(user != undefined){ //Se existir um usuario com esse email, eu agora tenho que validar a senha dele
            //Validando senha
            let corretPass = bcrypt.compareSync(password, user.password)
            if(corretPass){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }

                res.redirect("/admin/articles")
            }

            else{
                res.redirect("/login")
            }
            
        }
        else{
            res.redirect("/login")
        }
    })
});

module.exports = router;
