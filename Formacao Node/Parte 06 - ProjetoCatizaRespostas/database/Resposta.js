const db = require ("./database.js");

//Model: estrutura de dados que representa a nossa tabela como um objetivo javascript
const Resposta = db.connection.define('respostas', {
    corpo: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    idPergunta: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    }
})

//Comentar ou apagar após usar se nao recria a tabela  e apaga tudo dentro dela. Por isso executa-lo uma unica vez quando criar o model
Resposta.sync({force: false}).then(() => {})

module.exports = Resposta;