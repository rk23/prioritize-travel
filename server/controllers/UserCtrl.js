var express     = require('express'),
    User        = require('../models/user'),
    router      = express.Router();

router.get('/', function(req, res){
  res.send('HI');
});

router.post('/updateDaily', function(req, res){

  User.findOne({_id: req.user._id}, function(err, user){
    if(err) console.log(err);
    user.bank.pendingDeposit += parseInt(req.body.savings);
    user.save();
    res.send('200')
  })
});

module.exports = router;