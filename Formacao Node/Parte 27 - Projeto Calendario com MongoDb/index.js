const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const AppointmentService = require('./services/AppointmentService')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

mongoose.connect("mongodb://localhost:27017/sistemaAgendamento", {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
    console.log("Conexão com o banco de dados estabelecida")
}).catch((error) => {
    console.log(error)
})

app.get('/', async (req, res) => {
    res.render('index')
})

app.get('/cadastro', (req, res) =>{
    res.render('create')
})

app.post('/create', async (req, res) => {
    const {name, email, description, cpf, date, time} = req.body

    if(name != "" || email != "" || description != "" || cpf != "" || date != "" || time != ""){
        let result = await AppointmentService.Create(name, email, description, cpf, date, time)

        if(result.status == true){
            console.log(result)
            res.redirect('/')
        }

        else{
            console.log(result)
            res.redirect('/cadastro')

        }
    }

    else{
        res.redirect('/cadastro')
    }

    
})

app.get('/calendar', async (req, res) => {
    let result = await AppointmentService.GetAll(false)

    if(result.status){
        res.json(result.appointments)
    }
    
    else{
        res.send("Problema para encontrar todos as consultas no banco")
    }

    //IMP: Para preencher corretamente o calendario, eu preciso para corretamente a data em conjunto com o tempo
    //A factory é responsavel por transformar os valores passados em dados mais complexos
})

app.get("/event/:id", async (req, res) => { 
    let result = await AppointmentService.GetById(req.params.id)

    if(result.status){
        res.render('event', {
            appointment: result.appointment
        })
    }
    
    else{
        res.redirect('/')
    }
})

app.post("/finish", async (req,res) => {
    let id = req.body.id
    if(id != undefined){
        let status = await AppointmentService.Finish(id)
        if(status == true){
            res.redirect('/')
        }
        else{
            res.json({error: "Erro para atualizar"})
        }
    }
    else{
        res.json({error: "Id is required"})
    }
})
app.get("/list", async (req, res) => {
    let result = await AppointmentService.GetAll(true)

    console.log(result)
    if(result.status){
        console.log(result.appointments)
        res.render('list', {
            appointments: result.appointments
        })
    }
    else{
        res.send("Problema para encontrar todos as consultas no banco")
    }
})

//Trabalhando com formulario com a rota GET
app.get("/searchresult", async (req, res) => {
    let search = req.query.search
    console.log(search)
    if(search != ""){
        let result = await AppointmentService.Search(search)
        if(result.status == true){
            console.log(result.appointments)
            res.render('list', {
                appointments: result.appointments
            })
        }
        else{
            res.send("Paciente não encontrado")
        }
    }
    else{
        let resultAll = await AppointmentService.GetAll(true)
        if(resultAll.status == true){
            console.log(resultAll.appointments)
            res.render('list', {
                appointments: resultAll.appointments
            })
        }
        else{
            res.send("Erro na busca de pacientes")
        }
    }
})

//A cada 5 min irá notificar que tem uma notifição pendente a ser enviada
let pollTime = 1000 * 60 * 5

setInterval( async () => {
    await AppointmentService.SendNotification()
}, pollTime)

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080")
})