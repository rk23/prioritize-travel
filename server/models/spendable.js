var mongoose = require('mongoose');

var spendableSchema = new mongoose.Schema({
  name: String,
  amount: Number
});

var Spendable = mongoose.model('Spendable', spendableSchema);

module.exports = Spendable;