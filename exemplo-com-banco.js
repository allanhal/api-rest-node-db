const express = require("express");
const mysql = require("mysql2/promise");
require('dotenv').config()

const app = express();
const port = 3000;

app.use(express.json());

const { HOST, USER, PASSWORD, DATABASE } = process.env

// console.log({ HOST, USER, PASSWORD, DATABASE })

// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

async function executarNoBanco(query) {
  const conexao = await mysql.createConnection({
    host: process.argv[2],
    user: process.argv[3],
    password: process.argv[4],
    database: process.argv[5],
  });

  const [results] = await conexao.execute(query);

  return results;
}

app.get("/produtos", async (req, res) => {
  let produtos = await executarNoBanco("SELECT * FROM produtos");

  res.send(produtos);
});

app.get("/produtos/:id", async (req, res) => {
  let produto = await executarNoBanco(
    "SELECT * FROM produtos WHERE id=" + req.params.id
  );

  res.send(produto[0]);
});

app.delete("/produtos/:id", async (req, res) => {
  let query = "DELETE FROM produtos WHERE id=" + req.params.id;

  await executarNoBanco(query);

  res.send(204);
});

app.post("/produtos", async (req, res) => {
  const body = req.body;

  let query = `
        INSERT INTO produtos 
            (nome, categoria, valor, tamanho)
        VALUES
            ('${body.nome}', '${body.categoria}', '${body.valor}', '${body.tamanho}')
    `;

  const resultado = await executarNoBanco(query);
  body.id = resultado.insertId; //recuperando o id que foi gerado e adicionando na resposta

  res.send(body);
});

app.patch("/produtos/:id", async (req, res) => {
  let query = `
        UPDATE produtos SET 
            categoria = '${req.body.categoria}',
            tamanho = '${req.body.tamanho}'
        WHERE id = ${req.params.id}
    `;

  await executarNoBanco(query);

  res.send(req.body);
});

app.listen(port, () => {
  console.log("Servidor rodando em http://localhost:" + port);
});
