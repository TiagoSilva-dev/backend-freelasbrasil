const express = require('express');
const app = express();
const cors = require('cors');
const puppeteer = require('puppeteer');

app.use(cors());
app.get('/freelas', (req, res) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.br.freelancer.com/jobs/javascript_react-js_angular-js_vue-js_php_java/?languages=pt');


    const vagaList = await page.evaluate(() => {
      const nodeList = document.querySelectorAll('.JobSearchCard-item ')
      const vagaArray = [...nodeList]
      const it = [];
      const vagaList = vagaArray.map((item) => {
        it.push({
          titulo: item.querySelectorAll('.JobSearchCard-primary-heading-link')[0].outerText,
          link: item.querySelectorAll('.JobSearchCard-primary-heading-link')[0].href,
          dias: item.querySelectorAll('.JobSearchCard-primary-heading-days')[0].outerText,
          descricao: item.querySelectorAll('.JobSearchCard-primary-description')[0].outerText,
          oferta: item.querySelectorAll('.JobSearchCard-primary-price')[0].outerText
        });

      })
      return it
    })
       res.json(vagaList);
    await browser.close();
  })();
});

app.listen(process.env.PORT || 3002, () => {
  console.log('app rodando');
})