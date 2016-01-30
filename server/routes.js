/**
 * Created by ReedK on 1/29/16.
 */
var path = require('path');
module.exports = {

  //'/api/getAll' : require('./controllers/MainCtrl'),


  '/' : function(req, res){
    res.sendFile(path.join(__dirname, '../client/index.html'));
  }
};