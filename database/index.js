var mysql = require('mysql');

var connection = mysql.createConnection(require('./config.js'));

module.exports.getAll = function (callback) {
  connection.query('SELECT * FROM Phones', (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};