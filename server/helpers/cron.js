var nodemailer  = require('nodemailer'),
    User        = require('../models/user'),
    CronJob     = require('cron').CronJob;

var job = new CronJob('15 * * * * *', function() {
    /*
     * Runs every Sunday at 9AM
     */

  User.find({}, function(err, users){
    users.forEach(function(user){
      //Increment total savings first
      user.bank.totalSavings += user.bank.pendingDeposit;

      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport('smtps://name%40gmail.com:pw@smtp.gmail.com');

// setup e-mail data with unicode symbols
      var mailOptions = {
        from: 'Name <name@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: 'Your Weekly Savings - $' + user.bank.pendingDeposit + '.00', // Subject line
        text: '- ' + user.bank.pendingDeposit, // plaintext body
        html: '<p>Hi ' + user.firstName + ', <br><br>Here\'s your weekly savings report from <b>Prioritize' +
          ' Travel</b>.<h2>Savings this week: <span style="font-weight: 100">$' + user.bank.pendingDeposit + '.00</span><h2><h3>Total' +
        ' Savings: <span style="font-weight: 100">$' + user.bank.totalSavings + '.00</span></h3><p>Be sure to deposit' +
        ' this' +
        ' right away! In X weeks you can afford to meet your goal</p><br><p>Your friends at <b>Prioritize Travel</b>, </p><p> Erin Moon, Jo Chong, Adriane Purdy, Blake Allen, and Reed Kinning</p>' // html body
      };

// send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          return console.log(error);
        }
        console.log('Message sent: ' + info.response);
      });

      user.bank.pendingDeposit = user.bank.totalRecurring;
      user.save();

    //  End for each
    })
  //  End user find
  });



  }, function () {
    /* This function is executed when the job stops */
  },
  true, /* Start the job right now */
  'America/Los_Angeles' /* Time zone of this job. */
);

module.exports = job;