const sgMail = require('@sendgrid/mail');

var util = {
    sendMail : (mail) => {
      sgMail.setApiKey('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');
      sgMail.send({...mail,...{from : 'souvickrocks95@gmail.com'}});
    }
  }

module.exports = util;