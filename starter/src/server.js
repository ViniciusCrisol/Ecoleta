const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('src/views', {
  express: app,
  noCache: true,
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  return res.render('index.html');
});

app.get('/create-point', (req, res) => {
  return res.render('create-point.html');
});

app.get('/search', (req, res) => {
  return res.render('search-results.html');
});

app.listen(3333);
