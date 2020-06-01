import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  response.json({ amor: 'lindo' });
});

app.listen(3333);
