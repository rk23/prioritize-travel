var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true},
  bank: {
    totalSavings: Number,
    pendingDeposit: Number,
    savingsGoal: Number
  },
  created_at: Date,
  updated_at: Date
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);