const express = require("express")
const session = require("express-session")
const flash = require("express-flash")
const bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")

const app = express()

app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser("dwdqwwdqdgwrthjtrj")) //senha que sera gerada para gerar o cookie

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash())

app.get("/", (req, res) => {
    // Se o erro nao acontecer, não é retornado undefined, mas sim [] (array vazio)
    let emailError = req.flash("emailError");
    let pontosError = req.flash("pontosError");
    let nomeError = req.flash("nomeError");
    let email = req.flash("email")
    let nome = req.flash("nome")
    let pontos = req.flash("pontos")


    emailError = (emailError == undefined || emailError.lenght == 0) ? undefined : emailError
    pontosError = (pontosError == undefined || pontosError.lenght == 0) ? undefined : pontosError
    nomeError = (nomeError == undefined || nomeError.lenght == 0) ? undefined : nomeError
    email = (email == undefined || email.lenght == 0) ? undefined : email
    nome = (nome == undefined || nome.lenght == 0) ? undefined : nome
    pontos = (pontos == undefined || pontos.lenght == 0) ? undefined : pontos

    res.render("index", {
        emailError,
        nomeError,
        pontosError,
        email,
        nome,
        pontos
    })
})

app.post("/form", (req, res) => {
    let {email, nome, pontos} = req.body;

    let emailError;
    let pontosError;
    let nomeError;

    if(email == undefined || email == "") {
        emailError = "O e-mail não pode ser vazio"
    }
    
    if(pontos == undefined || pontos < 20) {
        pontosError = "Voce nao pode ter menos de 20 pontos"
    }

    if(nome == undefined || nome == "") {
        nomeError = "O nome nao pode ser vazio"
    }

    if(nome.lenght < 4){
        nomeError = "O nome é muito pequeno"
    }

    if(emailError != undefined || pontosError != undefined || nomeError != undefined){
        //Flash session -> sessions que duram apenas uma requisicao, ou seja, voce usa uma vez e assim que a usa, ela é destruida
        //se o erro nao acontecer, não é retornado undefined, mas sim [] (array vazio)
        req.flash("emailError", emailError)
        req.flash("pontosError", pontosError)
        req.flash("nomeError", nomeError)

        req.flash("email", email)
        req.flash("nome", nome)
        req.flash("pontos", pontos)

        res.redirect("/");
    }
    else{
        res.send("Formulario CORRETO!")
    }
})

app.listen(8080, (req, res) => {
    console.log("Servidor rodando")
})