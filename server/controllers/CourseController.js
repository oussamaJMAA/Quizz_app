const mysql = require('mysql');


//Connection to database 
const pool = mysql.createPool({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

exports.view = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM courses', (err, rows) => {
      // When done with the connection, release it
      if (!err) {
        let removedUser = req.query.removed;
        res.render('courses',{rows});
      } else {
        console.log(err);
      }
      console.log('The data from courses table: \n', rows);
    });
  }
  


