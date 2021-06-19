const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


let freelas = [];
let site = 'https://www.br.freelancer.com';
request('https://www.br.freelancer.com/jobs/javascript_react-js_angular-js_vue-js_php_java/?languages=pt', function (err, res, body) {
  if (err) console.log('Erro: ' + err);

  var $ = cheerio.load(body);

  $('.JobSearchCard-item').each(function () {
    freelas.push({
      titulo: $(this).find('.JobSearchCard-primary-heading-link').text().trim(),
      link:  site + $(this).find('.JobSearchCard-primary-heading-link').attr('href'),
      dias: $(this).find('.JobSearchCard-primary-heading-days').text().trim(),
      descricao: $(this).find('.JobSearchCard-primary-description').text().trim(),
      oferta: $(this).find('.JobSearchCard-primary-price').text().trim(),
    });
  })
})

app.get('/freelas', (req, res) => {
  res.json(freelas);
});

app.listen(3002, () => {
  console.log('app rodando na porta ');
})