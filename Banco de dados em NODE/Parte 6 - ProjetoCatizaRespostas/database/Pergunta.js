const db = require ("./database.js");

//Model: estrutura de dados que representa a nossa tabela como um objetivo javascript
const Pergunta = db.connection.define('perguntas', {
    titulo: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
})

//Comentar ou apagar após usar se nao recria a tabela  e apaga tudo dentro dela. Por isso executa-lo uma unica vez quando criar o model
Pergunta.sync({force: false}).then(() => {})

module.exports = Pergunta;