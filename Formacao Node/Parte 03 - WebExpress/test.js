//Colocar como constante para evitar
const express = require("express");
const app = express(); //Cria uma copia inteira do framework para dentro dessa variavel, ou seja, qualquer coisa
                    //que for usar do express agora irei usar a partir da variavel app

//ROTAS: caminhos para aplicação
//Erro cannot get <rota>: não existe essa rota
app.get("/sobre", function(req, resp){
    resp.send('E é sobre isso e ta tudo bem!!');
})

app.get("/blog", function(req, resp){
    resp.send("BLOGAO");
})

//CUIDADO: APENAS UM SEND POR VEZ
app.get("/ola/:nome/:cargo", function(req, resp){
    resp.send("<h1>Para " + req.params.nome + "</h1>" + "<h2>Seu cargo é " + req.params.cargo + "</h2>");
})

app.get("/", function(req, resp){
    resp.sendFile(__dirname + "/html/test.html")
})

app.listen(8080, function(){
    console.log("SERVIDOR CONECTADO");
}); //Para o servidor rodar, porém essa função tem que ser a ULTIMA do código