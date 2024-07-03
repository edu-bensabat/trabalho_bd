// db.js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost", // Endereço do servidor MySQL
  user: "root", // Seu usuário do MySQL
  password: "5236Cdh*", // Sua senha do MySQL
  database: "space", // Nome do banco de dados que você quer acessar
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.stack);
    return;
  }
  console.log("Conectado ao banco de dados como id " + connection.threadId);
});

module.exports = connection;
