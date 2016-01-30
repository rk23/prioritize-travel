var nodemailer  = require('nodemailer'),
    CronJob     = require('cron').CronJob;

var job = new CronJob('00 00 09 * * 7', function() {
    /*
     * Runs every Sunday at 9AM
     */

// create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('smtps://reed.kinning%40gmail.com:rkinning23@smtp.gmail.com');

// setup e-mail data with unicode symbols
    var mailOptions = {
      from: 'Reed Kinning <reed.kinning@gmail.com>', // sender address
      to: 'reed.kinning@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world 🐴', // plaintext body
      html: '<b>Hello world 🐴</b>' // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });

  }, function () {
    /* This function is executed when the job stops */
  },
  true, /* Start the job right now */
  'America/Los_Angeles' /* Time zone of this job. */
);