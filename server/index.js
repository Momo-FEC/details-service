const express = require('express');
const app = express();
const port = 3002;
const db = require('../database/index.js');

app.use(express.static('public'));

app.get('/phones/:id', (req, res) => {
  db.getOne(req.params.id)
    .then((results) => {
      res.end(JSON.stringify(results));
    });
});

app.listen(port, () => { console.log(`Details is listening on port ${port}`); });