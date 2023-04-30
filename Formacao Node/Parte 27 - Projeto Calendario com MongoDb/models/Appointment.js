const mongoose = require('mongoose');

const appointment = new mongoose.Schema({
    name: String, 
    email: String,
    description: String,
    cpf: String,
    date: Date,
    time: String,
    finished: Boolean,
    notified: Boolean //Notificar o cliente
})


module.exports = mongoose.model('Appointment', appointment);