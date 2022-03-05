const { body } = require("express-validator");
const hebrewErrorValidator = require("../../utils/language/hebrew/hebrewErrorValidator");

exports.serviceValidator = [
  // body("category", hebrewErrorValidator.categoryHebError)
  //   .trim()
  //   .isLength({ min: 2 }),
  body("title", hebrewErrorValidator.titleHebError).trim().isLength({ min: 2 }),
  body("price", hebrewErrorValidator.priceHebError).trim().isNumeric(),
  body("duration", hebrewErrorValidator.durationHebError).trim().isNumeric(),
];
