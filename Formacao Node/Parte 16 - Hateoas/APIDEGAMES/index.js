const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken")

const JWTSecret = "23124fqefadf1qr12rwdfv32rt12ewqd124e12"

const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Middleware -> fica entre a requisicao do usuario e a rota
function authentication (req, res, next){
    const authToken = req.headers['authorization']
    if(authToken != undefined){
        const bearer = authToken.split(" ");
        let token = bearer[1]

        //A mesma senha (JWTSecret) que usei para criptografar eu uso para descriptografar
        jwt.verify(token, JWTSecret, (err, data) => {
            if(err){
                res.status(401)
                res.json({err: "Token Inválido!"})
            }
            else{
                req.token = token
                req.loggedUser = {
                    id: data.id,
                    email: data.email
                }
                //Assim que o processamento do middleware for concluido com sucesso, deve-se colocar o next para que passe a requisicao para rota
                next(); 
            }
        }) //A mesma senha que usei para criptografar eu uso para descriptografar
    }
    else {
        res.statusCode = 401
        res.json({err: "Token Inválido"})
    }
    
}

let DB = {
    games: [
        {
            id: 23,
            title: "Call of Duty MW",
            year: 2019,
            price: 50,
        },
        {
            id: 12,
            title: "Sea of Thives",
            year: 2017,
            price: 200,
        }, 
        {
            id: 25,
            title: "BF 2042",
            year: 2021,
            price: 100,
        }
    ],
    users: [
        {
            id: 1,
            name: "gc2001",
            email: "gabrielcatizani2001@hotmail.com",
            password: "09102001"
        },
        {
            id: 2,
            name: "na2000",
            email: "nath_ana@hotmail.com",
            password: "2010222"
        },
        {
            id: 3,
            name: "ju2002",
            email: "ju_nia@hotmail.com",
            password: "12345"
        }
    ]
}

app.get("/games", authentication, (req, res) => {
    //Aqui eu defino os links que posso usar dentro da nossa API. Bom fazer em array, pois permite que assim que o cliente receba o link, ele 
    //faça por exemplo um laço de repetição nessa lista de links
    let HATEOAS = [
        {
            href: "http://localhost:8080/game/0",
            method: "DELETE",
            rel: "delete_game"
        },
        {
            href: "http://localhost:8080/game/0",
            method: "GET",
            rel: "get_game"
        },
        {
            href: "http://localhost:8080/auth",
            method: "POST",
            rel: "login"
        }
    ]

    res.statusCode = 200;
    res.json({games: DB.games, _links: HATEOAS}); 
})

app.get("/game/:id", authentication, (req, res) => {
    let gameId = parseInt(req.params.id)
    if(isNaN(gameId)){
        res.sendStatus(400);
    }
    else{
        let game = DB.games.find((game) => game.id === gameId)
        if(game != undefined){
            let HATEOAS = [
                {
                    href: "http://localhost:8080/game/" + game.id,
                    method: "DELETE",
                    rel: "delete_game"
                },
                {
                    href: "http://localhost:8080/game/" + game.id,
                    method: "GET",
                    rel: "get_game"
                },
                {
                    href: "http://localhost:8080/game/" + game.id,
                    method: "PUT",
                    rel: "edit_game"
                },
                {
                    href: "http://localhost:8080/games",
                    method: "POST",
                    rel: "get_all_games"
                },
            ]
            res.statusCode = 200;
            res.json({game, _links: HATEOAS});
        }

        else{
           res.sendStatus(404) 
        }  
    }
})

app.post("/game", authentication, (req, res) => {
    let {title, price, year} = req.body;
    if(title != undefined && price != undefined && year != undefined){
        if(title != "" && !isNaN(parseInt(price)) && !isNaN(parseInt(year))){
            DB.games.push({
                id: 10,
                title,
                price,
                year
            })

            res.sendStatus(200);
        }
    }

    else{
        res.sendStatus(400) 
    }
})

app.delete("/game/:id", authentication, (req,res) => {
    let gameId = parseInt(req.params.id)
    
    if(isNaN(gameId)){
        res.sendStatus(400);
    }
    else{
        let gameIndex = DB.games.findIndex((game) => game.id === gameId)

        if(gameIndex == -1){
            res.sendStatus(404)
            
        }

        else{
            DB.games.splice(gameIndex, 1) //o 1 'e pra indicar que eu quero deletar apenas um elemento a partir desse indice
            res.sendStatus(200);
        }  
    }
})

app.put("/game/:id", authentication, (req, res) => {
    let gameId = parseInt(req.params.id)
    if(isNaN(gameId)){
        res.sendStatus(400);
    }
    else{
        let game = DB.games.find((game) => game.id === gameId)
        let {title, price, year} = req.body;

        if(game != undefined){
            if(title != undefined){
                if(title == ""){
                    res.sendStatus(400);
                }
                else{
                    game.title = title
                }
            }

            if(price != undefined){
                if(isNaN(price)){
                    res.sendStatus(400);
                }
                else{
                    game.price = price
                }
            }

            if(year != undefined){
                if(isNaN(year)){

                }
                else{
                    game.year = year
                }
            }

            res.statusCode = 200;
            res.json(game);
        }

        else{
           res.sendStatus(404) 
        }  
    }
})

app.post("/auth", (req, res) => {
    let {email, password} = req.body
    
    if(email != undefined){
        let user = DB.users.find(u => u.email == email) 

        if(user != undefined){
            if(user.password == password){
                //Geracao de um token que armazenara as informacoes que eu quiser. Apenas colocar informacoes essenciais e nao sensiveis.
                //Funcao assincrona, pois demora um tempo para ser executado a geracao de token (envolve criptografia)
                jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn: "48h"}, (err, token) => {
                    if(err) {
                        res.statusCode = 400
                        res.json({err: "Falha interna"})
                    }
                    else{
                        res.statusCode = 200
                        res.json({token: token})
                    }
                }) 
            }

            else{
                res.statusCode = 401
                res.json({err: "Credenciais INVÁLIDAS"})
            }
        }
        else{
            res.statusCode = 404
            res.json({err: "O email enviado não existe na base de dados"})
        }

    }
    else{
        res.statusCode = 400
        res.json({err: "O email enviado é invalido"})
    }
})

app.listen(8080, () => {
    console.log("Servidor RODANDO!!")
})