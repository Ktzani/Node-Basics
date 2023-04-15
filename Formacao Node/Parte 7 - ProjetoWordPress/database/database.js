const {Sequelize} = require("sequelize");

const connection = new Sequelize('wordPress', 'root', '0910', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    timezone: "-03:00"
});

module.exports = {
    Sequelize: Sequelize,
    connection: connection
}