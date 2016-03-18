var User = require('../app/models/user.js');

module.exports = function(app, passport) {

  // process the login form
  app.post('/login', 
    passport.authenticate('local-login'),
    function(req, res){
      console.log(req.user);
      res.json(req.user);
    }
  );

  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res){
    res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template
    });
  });

  // process the request for all the active users
  app.get('/allExecs', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    users = User.find({}, function(error, user){
      if(error) console.log(error);
      res.send(JSON.stringify(user));
    });
  });

  app.post('/updateLocation', function(req, res){
    console.log('updating location', req.body.update);
    res.setHeader('Content-Type', 'application/json');
    user = User.findByIdAndUpdate(req.body.id, req.body.update, function(err, user){
      if(err) console.log(err);
      console.log('user', user)
      res.send(JSON.stringify(user));
    });
  });

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
  }
}