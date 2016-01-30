var express = require('express');
var router = express.Router();

router.get('/getSavings', function(req, res){

  res.send('HI');
});

module.exports = router;