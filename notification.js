const sgMail = require('@sendgrid/mail');
const unirest = require("unirest");
var TeleSignSDK = require('telesignsdk');
const client = require('twilio')('AC4a4968d75a67e723a07164da99baf09a', '689262cbf3c09ca642485fe98d76d54d');

var util = {
    sendMail : (mail) => {
      //sgMail.setApiKey('');
      sgMail.send({...mail,...{from : 'souvickrocks95@gmail.com'}});
    },
    smsService : () => {

      client.messages
      .create({body: 'Hi there!', from: '+17085643684', to: '+917278937904'})
      .then(message => console.log(message.sid))
      .catch(err => console.log(err));

      /* var req = unirest("GET", "https://www.fast2sms.com/dev/bulk");
      req.query({
        "authorization": "JB5qrAthVCQDgXHyTxU0kabF6oE8WeY1spKOSmn9vIzdc7lfwGgjwQhfb9IqKO0YGeD2UtE6VRBl4azA",
        "sender_id": "FSTSMS",
        "language": "english",
        "route": "qt",
        "numbers": "7278937904",
        "message": "YOUR_QT_TEMPLATE_ID",
        "variables": "{AA}|{CC}",
        "variables_values": "12345|asdaswdx"
      });
  
      req.headers({
        "cache-control": "no-cache"
      });
  
      req.end(function (res) {
        if (res.error) throw new Error(res.error);
        console.log(res.body);
      }); */

    /*   const customerId = "9F2A6A42-E2AD-4FD0-B723-9350418E01F6";
      const apiKey = "gUGaYjt6OBcH35jjkpmp4uIusTLUqp7ocH4WmKeKmsYCiTbMS4l/eIL4PxBENR/CEwx7Tda6E9Ok8hE/RXrgfg==";
      const rest_endpoint = "https://rest-api.telesign.com";
      const timeout = 10*1000; // 10 secs
    
      const client = new TeleSignSDK( customerId,
          apiKey,
          rest_endpoint,
         // timeout // optional
          // userAgent
      );
    
      const phoneNumber = "917278937904";
      const message = "You're scheduled for a dentist appointment at 2:30PM.";
      const messageType = "ARN";
    
      console.log("## MessagingClient.message ##");
    
      function messageCallback(error, responseBody) {
          if (error === null) {
              console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
                  ` => code: ${responseBody['status']['code']}` +
                  `, description: ${responseBody['status']['description']}`);
          } else {
              console.error("Unable to send message. " + error);
          }
      }
      client.sms.message(messageCallback, phoneNumber, message, messageType);
     */
    }
  }

module.exports = util;