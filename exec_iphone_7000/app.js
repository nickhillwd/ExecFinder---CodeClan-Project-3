var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var app = express();
var request = require('request');
var servUrl = "https://fathomless-spire-32585.herokuapp.com";

//App settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);

//Serve js & css files from a public folder
app.use(express.static(__dirname + '/public'));

//INDEX
app.get("/", function(req, res){
  res.render('index');
});

//no use as login post now renders location & passes through object of user id
// app.get("/location", function(req, res){
//   res.render('location.ejs');
// });

//LOGIN
app.post('/', function(req, res){

  request.post(servUrl + '/login', {form:{email:req.body.email, password:req.body.password}}, function(error,response,body){
      if(response.statusCode === 200){       
        console.log("success");
        var jsonBody = JSON.parse(response.body);
        res.render("location", {user_id:jsonBody._id, name: "somebody"});
      } else if(error  || undefined) {
        console.log(error);
        console.log("failure");
      }
  });

});

//SIMPLE SERVER
var server = app.listen(process.env.PORT || 7000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Manager_Desktop Server listening at http://%s:%s', host, port);
});
