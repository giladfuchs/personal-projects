const sendgridTransport = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');

const jwt = require("jsonwebtoken");

const transpoter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);


const mail = async () => {
  //   console.log(email, "mail");
  sgMail.setApiKey("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");
  try {
    const msg = {
      to: 'igilfu@gmail.com',
      from: 'igilfu@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    await sgMail.send(msg);
    console.log("mail sent");

    return;
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
      return;
      // return next(error);
    }
  }
}
// setTimeout(() => {

//   mail('igilfu@gmail.com', "11")

// }, 2000)
exports.createToken = (employee) => {

  return jwt.sign(
    {
      employeeId: employee._id.toString(),
    },
    "roeeangel"
  );
};
