const express = require("express")
const bodyParser = require("body-parser");
const { title } = require("process");
const cors = require("cors");

const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

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
    ]
}

app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games); 
})

app.get("/game/:id", (req, res) => {
    let gameId = parseInt(req.params.id)
    if(isNaN(gameId)){
        res.sendStatus(400);
    }
    else{
        let game = DB.games.find((game) => game.id === gameId)

        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }

        else{
           res.sendStatus(404) 
        }  
    }
})

app.post("/game", (req, res) => {
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

app.delete("/game/:id", (req,res) => {
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

app.put("/game/:id", (req, res) => {
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

app.listen(8080, () => {
    console.log("Servidor RODANDO!!")
})