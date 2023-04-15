const {Sequelize} = require("sequelize");

const connection = new Sequelize('sitePerguntas', 'root', '0910', {
    host: "localhost",
    dialect: "mysql",
    query:{raw:true}
});

module.exports = {
    Sequelize: Sequelize,
    connection: connection
}