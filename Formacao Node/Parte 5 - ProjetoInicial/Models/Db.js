//Agora eu crio uma arquivo especifico so para conectarmos ao banco de dados
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postapp', 'root', '09102001GCFO', { 
    host: "localhost", 
    dialect: 'mysql',
    query:{raw:true}
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}