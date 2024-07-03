// app.js
const express = require("express");
const cors = require("cors"); // Importando o pacote cors
const connection = require("./db");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Habilitando o CORS para todas as rotas

//1
app.get("/companies-count", (req, res) => {
  connection.query(
    "SELECT base_lancamento.localizacao, COUNT(DISTINCT companhia.nome) AS quantidade_companhias FROM (companhia inner join missao on missao.fk_Companhia_nome = nome) inner join base_lancamento on localizacao = fk_Base_Lancamento_localizacao GROUP BY base_lancamento.localizacao",
    (err, results) => {
      if (err) {
        console.error("Erro na consulta:", err.stack);
        res.status(500).json({ error: "Erro ao realizar a consulta" });
        return;
      }
      const a = res.json(results);
      console.log(a);
    }
  );
});

//2
app.get("/night-launched-rockets", (req, res) => {
  const query = `
      SELECT foguete.descricao, lanca.Data_hora
      FROM foguete
      INNER JOIN lanca ON foguete.descricao = lanca.fk_Foguete_descricao
      WHERE TIME(STR_TO_DATE(lanca.Data_hora, '%Y-%m-%d %H:%i:%s')) >= '18:00:00' 
         OR TIME(STR_TO_DATE(lanca.Data_hora, '%Y-%m-%d %H:%i:%s')) < '06:00:00';
    `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Erro na consulta:", err.stack);
      res.status(500).json({ error: "Erro ao realizar a consulta" });
      return;
    }
    res.status(200).json(results);
  });
});

//3
app.get("/average-cost", (req, res) => {
  const query = `
      SELECT 
        base_lancamento.localizacao, 
        ROUND(AVG(foguete.custo), 2) AS media_custo_foguetes 
      FROM 
        base_lancamento
      INNER JOIN 
        lanca ON lanca.fk_Base_Lancamento_localizacao = base_lancamento.localizacao
      INNER JOIN 
        foguete ON foguete.descricao = lanca.fk_Foguete_descricao
      WHERE 
        foguete.custo > 0
      GROUP BY 
        base_lancamento.localizacao;
    `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Erro na consulta:", err.stack);
      res.status(500).json({ error: "Erro ao realizar a consulta" });
      return;
    }
    res.status(200).json(results);
  });
});

//4
app.get("/missions-completed", (req, res) => {
  const query = `
      SELECT 
        companhia.nome, 
        COUNT(missao.id) AS missao_completadas 
      FROM 
        companhia
      INNER JOIN 
        missao ON missao.fk_Companhia_nome = companhia.nome
      GROUP BY 
        companhia.nome;
    `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Erro na consulta:", err.stack);
      res.status(500).json({ error: "Erro ao realizar a consulta" });
      return;
    }
    res.status(200).json(results);
  });
});

//5
app.get("/countries-presents-companies", (req, res) => {
  const query = `
      SELECT 
        base_Lancamento.pais AS Pais, 
        COUNT(DISTINCT companhia.nome) AS Numero_Companhias 
      FROM 
        base_Lancamento
      LEFT JOIN 
        companhia ON base_Lancamento.pais = companhia.pais
      GROUP BY 
        base_Lancamento.pais;
    `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Erro na consulta:", err.stack);
      res.status(500).json({ error: "Erro ao realizar a consulta" });
      return;
    }
    res.status(200).json(results);
  });
});

//6
app.get("/rockets-in-activity", (req, res) => {
  const query = `
      SELECT 
        SUM(CASE WHEN status = 'StatusActive' THEN 1 ELSE 0 END) AS Foguetes_Em_Atividade,
        SUM(CASE WHEN status = 'StatusRetired' THEN 1 ELSE 0 END) AS Foguetes_Nao_Em_Atividade
      FROM 
        Foguete;
    `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Erro na consulta:", err.stack);
      res.status(500).json({ error: "Erro ao realizar a consulta" });
      return;
    }
    res.status(200).json(results[0]); // results[0] to return a single object instead of an array
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
