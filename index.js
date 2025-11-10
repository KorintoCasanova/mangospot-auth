const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Função simples para validar CPF (formato e dígitos)
function validaCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10]);
}

app.post('/auth', (req, res) => {
  const { cpf, mac, ip, link_login } = req.body;

  if (!cpf || !validaCPF(cpf)) {
    return res.send('CPF inválido. Tente novamente.');
  }

  // Redireciona para o MikroTik com username e password
  const redirectUrl = `${link_login}?username=${cpf}&password=${cpf}`;
  res.redirect(302, redirectUrl);
});

app.listen(3000, () => {
  console.log('Servidor MangoSpot rodando na porta 3000');
});
