const { error404, error422 } = require("../../../utils/error/dbErrorHandler");

const Domain = require("../../../models/domain.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // to generate signed token
const { createToken } = require("../../helper/helper.controller");



exports.employeeSmsResetPassword = async (req, res, next) => {
  try {
    const { phone } = req.body;



    const domain = await Domain.findOne({ phone: phone });
    error404(domain);

    const token = jwt.sign(
      {
        domain,
        phone
      },
      "roeeangel"
    );



    // client.messages
    //   .create({
    //     body: `אנא לחץ על הלינק https://kavanuu.firebaseapp.com/resetPassword/${token}      ${phone}`,
    //     from: "+12069845943",
    //     to: "+972543055086",
    //   })
    //   .then((message) => console.log(message.sid))
    //   .done();

    // transpoter.sendMail({
    //   to: "igilfu@gmail.com",
    //   from: "kavanu@kavanu.com",
    //   subject: "reset password",
    //   html: `<a>http://localhost:3000/business/resetpassword/${token}</a>
    //             <p> click in here </p>
    //             <p> phone : ${phone} </p>
    //             <p> domain : ${domain} </p>

    //             `,
    // });



    res.status(200).json({
      message: "sms for reset sent to" + phone,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

exports.employeeResetPassword = async (req, res, next) => {
  try {
    error422(req);
    const { password } = req.body;

    const hashedPw = await bcrypt.hash(password, 12);
    req.employee.password = hashedPw;

    await req.employee.save();

    const token = createToken(req.employee);
    res.status(200).json({
      message: "employee change password success",
      token,
      domain: req.domain,
    });
  } catch (error) {
    return next(error);
  }
};
