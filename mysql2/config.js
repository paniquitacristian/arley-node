const mysql = require('mysql2');

// Tu código de SELECT, INSERT, UPDATE, DELETE aquí

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'ANGARITA',
    connectionLimit: 10,
    queueLimit: 0
  });
  
  module.exports = db.promise();