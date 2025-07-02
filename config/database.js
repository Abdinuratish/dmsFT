var mysql = require('mysql');

/* Connect database mysql */
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'dentalclinic'
});
module.exports = connection;