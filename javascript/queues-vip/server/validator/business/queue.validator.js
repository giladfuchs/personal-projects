const { body } = require("express-validator");
const hebrewErrorValidator = require("../../utils/language/hebrew/hebrewErrorValidator");

exports.queueValidator = [
  body("title", hebrewErrorValidator.titleHebError).trim().isLength({ min: 2 }),
];
