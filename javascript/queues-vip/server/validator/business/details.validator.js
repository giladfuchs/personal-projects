const { body } = require("express-validator");

const hebrewErrorValidator = require("../../utils/language/hebrew/hebrewErrorValidator");

exports.businessDetailsValidator = [
  //Business Details
  body("details.name", hebrewErrorValidator.businessNameHebError)
    .trim()
    .not()
    .isEmpty(),
  body("details.address", hebrewErrorValidator.businessAdressHebError)
    .trim()
    .notEmpty(),
  body("details.email", hebrewErrorValidator.emailHebError)
    .trim()
    .normalizeEmail()
    .isEmail(),
  body("details.phone", hebrewErrorValidator.phoneHebError)
    .trim()
    .isMobilePhone()
    .isLength({
      min: 2,
      max: 11,
    }),
];

// exports.businessHoursValidator = [
//   body("schedule")
//     .custom((value) => {
//       return (
//         Array.isArray(value) && value.every((e) => e.startTime < e.endTime)
//       );
//     })
//     .withMessage("בעיה בלוח זמנים"),
// ];
