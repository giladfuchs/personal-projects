const { body } = require("express-validator");
const Emplyee = require("../../models/employee.model");
const Domain = require("../../models/domain.model");
const hebrewErrorValidator = require("../../utils/language/hebrew/hebrewErrorValidator");

exports.employeeValidator = [
  body("firstName", hebrewErrorValidator.firstNameHebError)
    .trim()
    .not()
    .isEmpty()
    .isLength({
      min: 2,
      max: 12,
    }),
  body("lastName", hebrewErrorValidator.lastNameHebError).trim().notEmpty(),
  body("email", hebrewErrorValidator.emailHebError)
    .isEmail()
    .normalizeEmail()
    .custom((value, { req }) => {
      return Emplyee(req.mongo)
        .findOne({ email: value })
        .then((userDoc) => {
          if (userDoc)
            return Promise.reject(
              hebrewErrorValidator.emailRegisterExistHebError
            );
        });
    }),
  body("password", hebrewErrorValidator.passwordHebError)
    .trim()
    .notEmpty()
    .isLength({
      min: 6,
    }),
  body("phone", hebrewErrorValidator.phoneHebError)
    .trim()
    .isMobilePhone()
    .isLength({
      min: 2,
      max: 11,
    })
    .custom((value, { req }) => {
      return Domain.findOne({ phone: value }).then((userDoc) => {
        if (userDoc)
          return Promise.reject(
            hebrewErrorValidator.phoneRegisterExistHebError
          );
      });
    }),
];

exports.firstEmployeeValidator = [
  body("firstName", hebrewErrorValidator.firstNameHebError)
    .trim()
    .not()
    .isEmpty()
    .isLength({
      min: 2,
      max: 12,
    }),
  body("lastName", hebrewErrorValidator.lastNameHebError).trim().notEmpty(),
  body("email", hebrewErrorValidator.emailHebError)
    .isEmail()

  ,
  body("password", hebrewErrorValidator.passwordHebError)
    .trim()
    .notEmpty()
    .isLength({
      min: 6,
    }),
  body("phone", hebrewErrorValidator.phoneHebError)
    .trim()
    .isMobilePhone()
    .isLength({
      min: 2,
      max: 11,
    })

];


exports.passwordIsEqualValidator = [
  body("password", hebrewErrorValidator.passwordHebError)
    .trim()
    .notEmpty()
    .isLength({
      min: 6,
    }),
  // body("password", hebrewErrorValidator.passwordConfirmHebError).equals(),
];
