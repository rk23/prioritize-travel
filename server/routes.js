var path = require('path');
module.exports = {

  //'/' : require('./controllers/MainCtrl'),
  '/calc' : require('./controllers/CalculatorCtrl'),
  '/user' : require('./controllers/UserCtrl'),

  '/' : function(req, res){
    res.sendFile(path.join(__dirname, '../client/index.html'));
  }
};