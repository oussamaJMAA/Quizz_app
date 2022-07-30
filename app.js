const express = require('express');
const exphbs = require('express-handlebars'); //rendering engine
exphbs.registerHelper('dateFormat', require('handlebars-dateformat'));
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000 ;

// Parsing middleware
// parse application/x-www-form-url-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
//parse application/json
app.use(bodyParser.json());
// Static files (css)
app.use(express.static('public'));
// Setup templating engine 
app.engine('hbs', exphbs.engine({extname: '.hbs'})); // modify the extension to hbs instead of handlebars
app.set('view engine','hbs');

//Create Connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quiz_app'
  });
  
  //connect to database
  conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });
// Router
app.get('/',(req,res)=>{
    res.render('home') ; 
});

app.get('/courses',(req, res) => {
    let sql = "SELECT * FROM courses";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.render('courses',{
        results: results
      });
    });
  });
/*
const course_route = require('./server/routes/courses');
app.use('/courses',course_route);
*/
app.listen(port,()=> console.log(`listening on port ${port}`));
