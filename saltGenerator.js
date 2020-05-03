const sgMail = require('@sendgrid/mail');

var bcrypt = require('bcryptjs');
salt = bcrypt.genSaltSync(8);
module.exports = salt;