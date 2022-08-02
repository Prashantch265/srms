const { mailer } = require("./utils/node-mailer");

const test = async () => {
  let mailerData = {
    reciever: "prashantchy265@gmail.com",
    subject: "SRMS login credential",
    templateFile: "login-credential",
    context: {
      userName: "prashant.chaudhary",
      password: "test",
    },
  };
  return await mailer(mailerData);
};

test();
