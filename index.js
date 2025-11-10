const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/auth', (req, res) => {
  const { cpf, mac, ip, link_login } = req.body;

  if (cpf && cpf.length === 11) {
    const redirectUrl = `${link_login}?username=${cpf}&password=${cpf}`;
    res.redirect(302, redirectUrl);
  } else {
    res.send('CPF inválido');
  }
});

app.listen(3000, () => {
  console.log('Servidor MangoSpot rodando na porta 3000');
});
