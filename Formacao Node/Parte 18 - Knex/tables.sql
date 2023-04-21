CREATE TABLE games (
    codigo serial PRIMARY KEY,
    nome VARCHAR ( 120 ) NOT NULL DEFAULT '0',
    preco FLOAT NOT NULL DEFAULT 0
);