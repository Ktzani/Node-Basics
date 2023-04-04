//Models: referencia da sua tabela dentro do sequelize

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('test', 'root', '09102001GCFO', { host: "localhost", dialect: 'mysql' });

const Postagem = sequelize.define('postagens',{
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

Postagem.create({
    titulo: "God of War",
    conteudo: "Jogo de Guerra mt daora"
});

//Sincroniza o model com o mySql (comentar após usar se nao recria a tabela)
// Postagem.sync({force: true});

const Usuarios = sequelize.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING
    }
})

Usuarios.create({
    nome: "Joao",
    sobrenome: "Gabriel",
    idade: 15,
    email: "joaogabriel2006@hotmail.com"
})

// Usuarios.sync({force: true})