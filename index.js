var express     = require('express'),
    mongoose    = require('mongoose'),
    request     = require('request'),
    path        = require('path'),
    bodyParser  = require('body-parser'),
    _           = require('lodash'),

  app         = express();


mongoose.connect('mongodb://localhost:27017/prioritize-travel' || process.env.MONGOLAB_URI);
mongoose.connection.once('open', function(){

  //Load DB models
  app.models = require('./server/models/index');

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static(path.join(__dirname, 'client')));

  // Load the routes.
  var routes = require('./server/routes');
  _.each(routes, function(controller, route) {
    app.use(route, controller);
  });

  console.log("RUNNING");
  app.listen(process.env.PORT || 3000);
});