var express     = require('express'),
    mongoose    = require('mongoose'),
    request     = require('request'),
    path        = require('path'),
    bodyParser  = require('body-parser'),
    _           = require('lodash'),
    passport    = require('passport'),
    http        = require('http'),
    LocalStrategy = require('passport-local').Strategy,
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session     = require('express-session'),

    app         = express();


  mongoose.connect('mongodb://localhost:27017/prioritize-travel' || process.env.MONGOLAB_URI);
  mongoose.connection.once('open', function(){

  //Load DB models
  app.models = require('./server/models/index');

  //Point to Angular Dir
  app.use(express.static(path.join(__dirname, 'client')));
  app.use(bodyParser.urlencoded({extended: true}));


  //TODO: Do I need this?
  //app.use(cookieParser('mYsEcReT'));
  app.use(session({
    secret: 'sasdlfkajsldfkajweoriw234234ksdfjals23',
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // passport config
  var User = require('./server/models/user');
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser())


  // Load the routes.
  var routes = require('./server/routes');
  _.each(routes, function(controller, route) {
    app.use(route, controller);
  });

  console.log("RUNNING");
  app.listen(process.env.PORT || 3000);
});