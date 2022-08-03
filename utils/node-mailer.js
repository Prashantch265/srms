const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const sgTransport = require("nodemailer-sendgrid-transport");
const sgMail = require("@sendgrid/mail");
const handlebars = require("handlebars");
const { mailerConfig } = require("../config/config");
const path = require("path");
const fs = require("fs");

const nodeMailer = (data) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport(mailerConfig);

    // point to the template folder
    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./views/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views/"),
    };

    // use a template file with nodemailer
    transporter.use("compile", hbs(handlebarOptions));

    let mailOptions = {
      from: `Shanker Dev Campus <${"edxplor.edu@gmail.com"}>`, // sender address
      to: [data.reciever], // list of receivers
      subject: `${data.subject}`,
      template: `${data.templateFile}`, // the name of the template file i.e email.handlebars
      context: data.context,
    };

    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      console.log("Message sent: " + info.response);
      resolve(`mail sent to ${data.reciever} successfully`);
    });
  });
};

const sendgridMailer = (data) => {
  return new Promise((resolve, reject) => {
    sgMail.setApiKey(mailerConfig.auth.api_key);

    const emailTemplate = fs.readFileSync(
      path.resolve(`./views/${data.templateFile}.handlebars`),
      "utf-8"
    );

    const template = handlebars.compile(emailTemplate);

    const message = template({
      context: data.context,
    });

    let mailOptions = {
      from: "prashant.chaudhary@infodevelopers.com.np", // sender address
      to: [data.reciever], // list of receivers
      subject: `${data.subject}`,
      html: message, // the name of the template file i.e email.handlebars
    };

    sgMail.send(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      console.log("Message sent: " + info.response);
      resolve(`mail sent to ${data.reciever} successfully`);
    });
  });
};

module.exports = { nodeMailer, sendgridMailer };
