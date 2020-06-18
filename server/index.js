const express = require('express');
const app = express();
const port = 3002;
const db = require('../database/index.js');

app.use(express.static('public'));

app.get('/phones', (req, res) => {
  db.getAll((err, results) => {
    if (err) {
      res.end(JSON.stringify(err));
    } else {
      res.end(JSON.stringify(results));
    }
  });
});

app.listen(port, () => {console.log(`Details is listening on port ${port}`)});