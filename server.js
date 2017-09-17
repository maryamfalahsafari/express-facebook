var express = require('express');
var bodyParser = require('body-parser');


var passport = require('passport');
var strategy = require('passport-facebook').Strategy;


passport.use(new strategy({
    clientID: '357427201354915',
    clientSecret: '56bb2efce31d92d017bb5e18b281ed6b',
    //callbackURL: 'http://localhost:3000/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
  	console.log('accessToken',accessToken);
    return cb(null, profile);
}));


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


var server = express();
server.use(bodyParser.json());
server.use(passport.initialize());
server.use(passport.session());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


server.get('/', passport.authenticate('facebook'),
  function(req, res) {
    res.json({secure_data:'Hello World.'})
});

server.listen(3000,function(){
	console.log('Api running at port:3000');
});
