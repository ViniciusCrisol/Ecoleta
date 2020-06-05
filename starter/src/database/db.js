const selite3 = require('sqlite3').verbose();

const db = new selite3.Database('./src/database/database.db');

module.exports = db;

/* db.serialize(() => {
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
    'https://images.unsplash.com/photo-1533826114529-00704c85b39d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
    'Papersider',
    'Vinícius Crisol, Jardim paulista',
    'Número 2510',
    'São Paulo',
    'Franca',
    'Papéis e papelão',
  ];

  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }

    console.log('Cadastrado com sucesso');
    console.log(this);
  }

  db.run(query, values, afterInsertData);



  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err);
    }

    console.log(rows);
  });
});
*/
