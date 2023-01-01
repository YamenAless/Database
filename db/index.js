var mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password!',
    database: 'thinksyria'
});

module.exports = connection
  