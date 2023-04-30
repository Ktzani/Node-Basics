require('dotenv').config();

const Appointment = require("../models/Appointment")
const AppointmentFactory = require("../factories/AppointmentFactory")
const mailer = require("nodemailer")

class AppointmentService {
    async Create(name, email, description, cpf, date, time){
        let newAppo = new Appointment({
            name, 
            email, 
            description, 
            cpf, 
            date, 
            time,
            finished: false,
            notified: false
        })

        //Dica: usando try catch, printar o erro no console
        try {
            await newAppo.save()
            return {status: true, message: "Consulta marcada com sucesso"}
        } catch (error) {
            console.log(error)
            return {status: false, message: error}
        }
    }

    async GetAll(showFinished){
        if(showFinished){
            try{
                let appos = await Appointment.find()
                return {status: true, appointments: appos, finisheds: true}
            } catch(error) {
                console.log(error)
                return {status: false, appointments: {}, error: error}
            } 
        }
        else {
            try {
                let appos = await Appointment.find({finished: false})
                let appointments = [] 

                appos.forEach(appointment => {
                    if(appointment.date != undefined){
                        appointments.push(AppointmentFactory.Build(appointment))
                    }
                })

                return {status: true, appointments: appointments, finisheds: false}
            } catch (error) {
                console.log(error)
                return {status: false, appointments: [], error: error}
            }
        }
    }

    async GetById(id){
        try {
            let Appoint = await Appointment.findOne({_id: id})
            return {status: true, appointment: Appoint}
        }catch(error){
            console.log(error)
            return {status: false, appointment: {}, error: error}
        }
    }

    async Finish(id){
        try {
            await Appointment.findByIdAndUpdate(id, {finished: true})
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }

    async Search(query){
        try {
            let appos = await Appointment.find().or([{email: query}, {cpf: query}])
            return {status: true, appointments: appos}
        }catch(error){
            console.log(error)
            return {status: false, appointments: [], error: error}
        }
    }

    async SendNotification(){
        let appointments = await this.GetAll(false)
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        appointments.forEach( async (appointment) => {
            let date = app.start.getTime()
            let hour = 1000 * 60 * 60; //Isso indica 1h. Para colocar mais mais, basta multiplicar por 2,3
            let gap = date - Date.now() 

            if(gap <= hour){
                if(!appointment.notified){
                    await Appointment.findByIdAndUpdate(appointment.id, {notified: true})
                    
                    try {
                        transporter.sendMail({
                            from: `${process.env.EMAIL_SENDER} <${process.env.EMAIL_USERNAME}>`,
                            to: appointment.email,
                            subject: "Consulta proxima",
                            text: "FIQUE ATENTO! SUA CONSULTA ESTÁ PROXIMA",
                            html: `<p>Olá ${appointment.title},</p>
                                <p>Seja bem vindo(a),</p>
                                <p>Sua consulta vai acontecer em 1h`
                        }, (error, info) => {
                            if(error) {
                                res.status(404)
                                res.send(error)
                                return
                            }
                            else {
                                console.log(info)
                                res.status(200)
                                res.send(`Notificado o email ${appointment.title}`)
                            }
                        })
                    } catch (error) {
                        res.status(404)
                        res.send(error)
                        return
                    }
                }
            }
        })
    }
}

module.exports = new AppointmentService();