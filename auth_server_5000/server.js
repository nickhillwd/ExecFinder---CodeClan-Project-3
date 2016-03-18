// server.js

var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); 
// pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//To combar CORS
app.use(function(req, res, next){

  var allowedOrigins = ['https://fierce-cliffs-56254.herokuapp.com', 'https://morning-reef-49025.herokuapp.com', 'http://localhost:3000/', 'http://localhost:7000/'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  //must call next function so express moves on to next middleware function.
  next();
});

// required for passport
app.use(session({ secret: 'serverSideExecFinder' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//routes
require('./app/routes.js')(app, passport); 
// load our routes and pass in our app and fully configured passport

// launch
var server = app.listen(process.env.PORT || 5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('The back-end server magic happens at http://%s:%s', host, port);
});