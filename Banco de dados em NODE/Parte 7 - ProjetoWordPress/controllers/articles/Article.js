const db = require("../../database/database");
const Category = require("../categories/Category");

const Article = db.connection.define("articles", {
    title: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    slug: {
        type: db.Sequelize.STRING,
        allowNull: false,
    }, //Desenvolvimento Web -> desenvolvimento-web
    body: {
        type: db.Sequelize.TEXT,
        allowNull: false,
    },
});

Category.hasMany(Article); //Uma categoria possui varios artigos (realacionamento 1-N)
Article.belongsTo(Category); //Tod artigo pertence a uma categoria (PARA TODO)

//Usamos isso apenas para criar a tabela inicialmente. Não descomentar
// Article.sync({ force: true }).then(() => {});

module.exports = Article;
