var express = require('express');
var router = express.Router();
var helper = require('../helpers/expediaApiHelper');

router.post('/deals', function(req, res){
  var origin = req.body.origin;
  var destination = req.body.destination;
  helper.unrealDeals(origin, destination, function(unrealDeals){
    res.send(unrealDeals);
  });
});

router.post('/average', function(req, res) {
  var origin = req.body.origin;
  var destination = req.body.destination;
  helper.averagePriceUnreal(origin, destination, function(average){
    console.log(average);
    res.send(average);
  });
});

router.post('/thing', function(req, res){
  helper.topVacations('SEA', function(data){
    console.log(data);
    res.send(data);
  });
});

module.exports = router;
