mysql -h localhost -u root -p

CREATE TABLE usuarios(
    codigo serial PRIMARY KEY,
    nome VARCHAR ( 50 ) NOT NULL,
    email VARCHAR ( 100 ) UNIQUE NOT NULL,
    idade INT NOT NULL,
    senha VARCHAR ( 50 ) NOT NULL
);

INSERT INTO usuarios (nome, email, idade, senha) VALUES ("Gabriel Catizani", "gabrielcatizani2001@hotmail.com", 21, "09102001GCFO");
INSERT INTO usuarios (nome, email, idade, senha) VALUES ("Joao Lucas", "joaolucas2001@hotmail.com", 20, "1234");
INSERT INTO usuarios (nome, email, idade, senha) VALUES ("Robson Novato", "robsonnovato@hotmail.com", 22, "5678");

SELECT * FROM usuarios;

UPDATE usuarios SET email = "robsonnovato@gmail.com" where codigo = 2;

-- Modulo sequelize ajuda a trabalhar diretamente com o banco de dados a partir do node.js, ou seja, consigo 
-- realizar qualquer tipo de operação SQL

npm install --save sequelize
npm instal --save mqsql2    

O que o sequelize faz? É uma ORM que abstrai toda camada de banco de dados!! Assim, nao precisa digitar mais 
essas querys longas, facilitando o trabalho do banco de dados, conseguindo assim gerar tabelas com facilidade