var passport = require('passport');
var User = require('../models/user');
var express = require('express');
var router = express.Router();


router.post('/register', function(req, res) {
  console.log(req.body)
  User.register(new User({
    email : req.body.email,
    username : req.body.username,
    password : req.body.password,
    firstName : req.body.firstName,
    lastName : req.body.lastName}),
    req.body.password, function(err, user) {
      if(err) console.log(err);
      passport.authenticate('local')(req, res, function () {
        res.send('USER REGISTERED');
      });
    });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.send('logged out');
});

module.exports = router;

