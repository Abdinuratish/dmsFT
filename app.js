var express = require('express');  
var app = express();  
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');  
var path = require('path');  
var port = process.env.PORT || 1995; 

app.use(express.static(path.join(__dirname, 'assets')));  
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json());  
app.use(logger('dev'));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Login logics
const session = require('express-session');

app.use(session({
  secret: 'secrate',
  resave: false,
  saveUninitialized: false
}));


//var opn = require('opn');

/** Router  */
var userRouter = require('./routes/routes.js');  
userRouter(app);

app.listen(port);
    
console.log('\n================   •?((¯°·._.• ţµąɲ ąɲh ƶɨρρ¥ •._.·°¯))؟•   ================   \nServer running: http://localhost:' + port); 

/* Connect database */
global.connection = require('./config/database.js');
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ...\nLogger: \n");    
} else {
    console.log("Error connecting database ...\nLogger: \n");    
}
}); 

//open default browser
//opn('http://localhost:'+port+"/"); 