const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/picsImage', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Banco de dados conectado")
}).catch((err) => {
    console.log(err)
})

module.exports = mongoose