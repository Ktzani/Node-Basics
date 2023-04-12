const db = require("../../database/database");

const Category = db.connection.define("categories", {
    title: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    slug: {
        type: db.Sequelize.STRING,
        allowNull: false,
    }, //Desenvolvimento Web -> desenvolvimento-web
});

// Category.sync({ force: true }).then(() => {});

module.exports = Category;
