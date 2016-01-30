var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, required: true, unique: true },
  bank: {
    totalSavings: Number,
    pendingDeposit: Number
  },
  created_at: Date,
  updated_at: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;