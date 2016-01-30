/**
 * Created by ReedK on 1/29/16.
 */
Banks = new Mongo.Collection('banks');

Banks.allow({
  insert: function(userId, bank) {
    bank.createdAt = new Date();
    return true;
  },
  update: function(userId, bank, fields, modifier) {
    bank.createdAt = new Date();
    return true;
  },
  remove: function(userId, thing) {
    return true;
  }
});
