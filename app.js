const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

const API_URL =
  'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

// Página inicial
app.get('/', (req, res) => {
  res.render('index');
});

// Buscar mensagem na API
app.get('/mensagem', async (req, res) => {
  try {
    const response = await axios.get(API_URL);

    const mensagem = response.data[0];

    res.render('message', { msg: mensagem });
  } catch (error) {
    console.error('Erro ao acessar a API:', error.message);

    res.status(500).send(
      'Não foi possível carregar a mensagem. Tente novamente.'
    );
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});