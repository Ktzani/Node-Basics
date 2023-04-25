const express = require('express');
let app = express();

// A aplicacao express e socket.io devem estar rodando no mesmo servidor http e o servidor http que o socket.io requisita é o nativo do node 
// Por isso eu tenho que colocar a aplicacao express dentro do servidor http nativo do node para dps pegar o socket.io
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//Evento que acontece quando o usuario conecta com o servidor pela primeira vez. Esse cliente da callback é um socket, ou seja, a instancia do
//cliente que esta conectado a aplicação, com quem o servidor está se comunicando naquele momento
//OBS: todo socket tem um id unico
io.on('connection', (socket) => {

    //Testando se o cliente se desconectou
    socket.on("disconnect", () => {
        console.log("Cliente X de id " +  socket.id + " disconnected")
    })

    //Capturando evento do frontend, onde passo o evento que quero capturar e a resposta desse evento
    socket.on('boasvindas', (data) => {
        console.log("EXECUTANDO EVENTO DE BOAS VINDAS")
        console.log(data)
    })

    socket.on('palavra', (data) => {
        console.log(data)
        //Emitindo um evento do servidor para o cliente
        socket.emit('resultado', data.text + ' - Catiza Gameplays')
    })
})

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.render('index')
})

http.listen(8080, () => {
    console.log("App rodando")
})