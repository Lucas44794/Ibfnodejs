const express = require('express');
const mysql = require('mysql');
const app = express();

// Conexão com o banco de dados
const con = mysql.createConnection({
  host: "localhost",
  user: "seu_usuario",
  password: "sua_senha",
  database: "seu_banco_de_dados"
});

// Função de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  con.query(sql, [email, senha], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send('Login bem-sucedido!');
    } else {
      res.send('Email ou senha incorretos.');
    }
  });
});

// Função de criação de usuário
app.post('/criarUsuario', (req, res) => {
  const { nome, telefone, endereco, cep, email, whatsapp, permissao, data_cadastro, curso, turma } = req.body;
  const sql = 'INSERT INTO usuarios SET ?';
  const usuario = { nome, telefone, endereco, cep, email, whatsapp, permissao, data_cadastro, curso, turma };
  con.query(sql, usuario, (err, result) => {
    if (err) throw err;
    res.send('Usuário criado com sucesso!');
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
