//Arquivo com todo model de post (Uma boa pratica separar os models por arquivo)
//LEMBRAR: ao criar um model criar com a primeira letra MAIUSCULA
const db = require('./Db')

const Post = db.sequelize.define('postagens', {
    titulo: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    conteudo: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
})

//Comentar ou apagar após usar se nao recria a tabela  e apaga tudo dentro dela. Por isso executa-lo uma unica vez quando criar o model
// Post.sync({force: true}) 

module.exports = Post;