const express = require('express');
const nunjucks = require('nunjucks');

const db = require('./database/db');

const app = express();

nunjucks.configure('src/views', {
  express: app,
  noCache: true,
});

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.render('index.html');
});

app.get('/create-point', (req, res) => {
  return res.render('create-point.html');
});

app.post('/create-point', (req, res) => {
  console.log(req.body);

  db.run(`
  CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    name TEXT,
    address TEXT,
    address2 TEXT,
    state TEXT,
    city TEXT,
    items TEXT
  );
  `);

  const query = `
  INSERT INTO places (
     image,
     name,
     address,
     address2,
     state,
     city,
     items
    )    
  VALUES (?,?,?,?,?,?,?);
  `;

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.render('create-point.html', { faild: true });
    }
  }

  db.run(query, values, () => afterInsertData());

  return res.render('create-point.html', { saved: true });
});

app.get('/search', (req, res) => {
  const search = req.query.search;

  if (search === '') {
    return res.render('search-results.html', { total: 0 });
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (
    err,
    rows
  ) {
    if (err) {
      return console.log(err);
    }

    const total = rows.length;

    return res.render('search-results.html', { places: rows, total });
  });
});

app.listen(3333);
