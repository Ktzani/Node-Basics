const db = require("../../database/database");

const User = db.connection.define("users", {
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false,
    }, //Desenvolvimento Web -> desenvolvimento-web
});

// User.sync({ force: false }).then(() => {});

module.exports = User;
