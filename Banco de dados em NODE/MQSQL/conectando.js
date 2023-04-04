const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('test', 'root', '09102001GCFO', { host: "localhost", dialect: 'mysql' });


sequelize.authenticate().then(function(){
    console.log('Conexão estabelecida!');
}).catch (function(error) {
    console.error('Falha ao conectar com o banco de dados:', error);
})