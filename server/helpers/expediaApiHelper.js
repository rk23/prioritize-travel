var express = require('express');
var request = require('request');
var async   = require('async');

module.exports = {

  unrealDeals: function (origin, destination, callback) {

    var uri = 'http://terminal2.expedia.com:80/x/deals/packages?originTLA=' + origin + '&destinationTLA=' + destination + '&startDate=2016-03-01&endDate=2016-12-31&lengthOfStay=5&roomCount=1&adultCount=1&childCount=0&infantCount=0&apikey=BAAGqgon5IWIpBxkrprhYzQDY4bZpPlE';

    request(uri, function (req, res) {
      var unrealDeals = JSON.parse(res.body).deals.packages;
      callback({unrealDeals: unrealDeals});
    });
  },

  averagePriceUnreal: function (origin, destination, callback) {

    var uri = 'http://terminal2.expedia.com:80/x/deals/packages?originTLA=' + origin + '&destinationTLA=' + destination + '&startDate=2016-03-01&endDate=2016-12-31&lengthOfStay=5&roomCount=1&adultCount=1&childCount=0&infantCount=0&apikey=BAAGqgon5IWIpBxkrprhYzQDY4bZpPlE';
    var total = 0;

    request(uri, function (req, res) {
      var unrealDeals = JSON.parse(res.body).deals.packages;
      for (var i = 0; i < unrealDeals.length; i++) {
        total += unrealDeals[i].totalPackagePrice;
      }
      callback({average: total / unrealDeals.length});
    });
  },

  topSpotsCost: function (origin, callback) {

    var topSpots = [
      'CDG',
      'JFK',
      'FCO',
      'CUN',
      'LCY',
      'MIA',
      'MCO',
      'SFO',
      'MYR',
      'BKG'
    ];

    var place = [];
    var cost = [];

    for(var i = 0; i < topSpots.length; i ++){
      var uri = 'http://terminal2.expedia.com:80/x/deals/packages?originTLA=' + origin + '&destinationTLA=' + topSpots[i] + '&startDate=2016-03-01&endDate=2016-12-31&lengthOfStay=5&roomCount=1&adultCount=1&childCount=0&infantCount=0&apikey=BAAGqgon5IWIpBxkrprhYzQDY4bZpPlE';
      request(uri, function(req, res){
        if(!(JSON.parse(res.body).deals.packages)){
          console.log("undefined here");
          place.push(topSpots[i]);
          cost.push(0);
        }
        else {
          place.push(topSpots[i]);
          console.log(place);
          cost.push((JSON.parse(res.body).deals.packages)[0]);
        }
      })
    }
  },

  topVacations : function(origin, callback){
    var results = {};

    async.series([

      function(callback) {
        request('http://terminal2.expedia.com:80/x/deals/packages?originTLA=' + origin + '&destinationTLA=CDG&startDate=2016-03-01&endDate=2016-12-31&lengthOfStay=5&roomCount=1&adultCount=1&childCount=0&infantCount=0&apikey=BAAGqgon5IWIpBxkrprhYzQDY4bZpPlE',
        function(req, res){
          if(JSON.parse(res.body).deals.packages.length > 1) {
            results['CDG'] = (JSON.parse(res.body).deals.packages[0].totalPackagePrice);
            callback(null, results);
          }
          else {
            results['CDG'] = 0;
            callback(null, results);
          }
        })
      },

      function(callback) {
        request('http://terminal2.expedia.com:80/x/deals/packages?originTLA=' + origin + '&destinationTLA=JFK&startDate=2016-03-01&endDate=2016-12-31&lengthOfStay=5&roomCount=1&adultCount=1&childCount=0&infantCount=0&apikey=BAAGqgon5IWIpBxkrprhYzQDY4bZpPlE',
          function(req, res){
            if(JSON.parse(res.body).deals.packages.length > 1) {
              results['JFK'] = (JSON.parse(res.body).deals.packages[0].totalPackagePrice);
              callback(null, results);
            }
            else {
              results['JFK'] = 0;
              callback(null, results);
            }
          })
      },

      function(callback) {
        request('http://terminal2.expedia.com:80/x/deals/packages?originTLA=' + origin + '&destinationTLA=FCO&startDate=2016-03-01&endDate=2016-12-31&lengthOfStay=5&roomCount=1&adultCount=1&childCount=0&infantCount=0&apikey=BAAGqgon5IWIpBxkrprhYzQDY4bZpPlE',
          function(req, res){
            if(JSON.parse(res.body).deals.packages.length > 1) {
              results['FCO'] = (JSON.parse(res.body).deals.packages[0].totalPackagePrice);
              callback(null, results);
            }
            else {
              results['FCO'] = 0;
              callback(null, results);
            }
          })
      },

      function(callback) {
        request('http://terminal2.expedia.com:80/x/deals/packages?originTLA=' + origin + '&destinationTLA=CUN&startDate=2016-03-01&endDate=2016-12-31&lengthOfStay=5&roomCount=1&adultCount=1&childCount=0&infantCount=0&apikey=BAAGqgon5IWIpBxkrprhYzQDY4bZpPlE',
          function(req, res){
            if(JSON.parse(res.body).deals.packages.length > 1) {
              results['CUN'] = (JSON.parse(res.body).deals.packages[0].totalPackagePrice);
              callback(null, results);
            }
            else {
              results['CUN'] = 0;
              callback(null, results);
            }
          })
      },


      function(callback) {
        request('http://terminal2.expedia.com:80/x/deals/packages?originTLA=' + origin + '&destinationTLA=MIA&startDate=2016-03-01&endDate=2016-12-31&lengthOfStay=5&roomCount=1&adultCount=1&childCount=0&infantCount=0&apikey=BAAGqgon5IWIpBxkrprhYzQDY4bZpPlE',
          function(req, res){
            if(JSON.parse(res.body).deals.packages.length > 1) {
              results['MIA'] = (JSON.parse(res.body).deals.packages[0].totalPackagePrice);
              callback(null, results);
            }
            else {
              results['MIA'] = 0;
              callback(null, results);
            }
          })
      },

      function(callback) {
        request('http://terminal2.expedia.com:80/x/deals/packages?originTLA=' + origin + '&destinationTLA=MCO&startDate=2016-03-01&endDate=2016-12-31&lengthOfStay=5&roomCount=1&adultCount=1&childCount=0&infantCount=0&apikey=BAAGqgon5IWIpBxkrprhYzQDY4bZpPlE',
          function(req, res){
            if(JSON.parse(res.body).deals.packages.length > 1) {
              results['MCO'] = (JSON.parse(res.body).deals.packages[0].totalPackagePrice);
              callback(null, results);
            }
            else {
              results['MCO'] = 0;
              callback(null, results);
            }
          })
      },

      function(callback) {
        request('http://terminal2.expedia.com:80/x/deals/packages?originTLA=' + origin + '&destinationTLA=SFO&startDate=2016-03-01&endDate=2016-12-31&lengthOfStay=5&roomCount=1&adultCount=1&childCount=0&infantCount=0&apikey=BAAGqgon5IWIpBxkrprhYzQDY4bZpPlE',
          function(req, res){
            if(JSON.parse(res.body).deals.packages.length > 1) {
              results['SFO'] = (JSON.parse(res.body).deals.packages[0].totalPackagePrice);
              callback(null, results);
            }
            else {
              results['SFO'] = 0;
              callback(null, results);
            }
          })
      },

      function(callback) {
        request('http://terminal2.expedia.com:80/x/deals/packages?originTLA=' + origin + '&destinationTLA=MYR&startDate=2016-03-01&endDate=2016-12-31&lengthOfStay=5&roomCount=1&adultCount=1&childCount=0&infantCount=0&apikey=BAAGqgon5IWIpBxkrprhYzQDY4bZpPlE',
          function (req, res) {
            if (JSON.parse(res.body).deals.packages.length > 1) {
              results['MYR'] = (JSON.parse(res.body).deals.packages[0].totalPackagePrice);
              callback(null, results);
            }
            else {
              results['MYR'] = 0;
              callback(null, results);
            }
          })
      },


    ], function(){
      callback({results : results})
    })






  }
};













