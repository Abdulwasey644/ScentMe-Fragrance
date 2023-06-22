"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "info.bi.bi.tech@gmail.com",
      pass: "gmail@heavyPassword#123",
    },
  });

  // send mail with defined transport object
  transporter.sendMail({
    from: "info.bi.bi.tech@gmail.com", // sender address
    to: "abr3592@gmail.com", // list of receivers
    subject: "Order pLaced successfully", // Subject line
    text: "Hi customer!", // plain text body
    html:
      "<b>Your Order has been placed successfully against transaction id" +
      233 +
      "</b>", // html body
  },(error , info) =>{
    error ? console.log(error) : console.log('Email sent : ' + info.response)
  });
}

main().catch(console.error);
