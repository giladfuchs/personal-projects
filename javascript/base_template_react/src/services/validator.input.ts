import * as language from "../assets/language";

const emailPattern = /^\S+@\S+\.\S+$/;
const illegalChars = /[\W_]/;
// const checkNumeric1 = /[a-zA-Z]+/;
const checkNumeric2 = /[0-9]+/;
const checkLower = /[a-z]/;
const checkUpper = /[A-Z]/;
const ipAddress = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const checkValidity = (value: string, rules: any) => {
  if (!rules) return "";
  if (rules.isEmail) {
    const apos = value.indexOf("@");
    if (apos < 1) return language.emailError1;
    const dotpos = value.lastIndexOf(".");
    if (dotpos < 1) return language.emailError2;
    if (apos < 1 || dotpos - apos < 2) return language.emailError3;
    const arrEmail = value.split("@");
    if (arrEmail.length > 2) return language.emailError4;
    const arrEmail2 = arrEmail[1].split(".");
    if (arrEmail2.length > 2) return language.emailError5;
    if (
      illegalChars.test(arrEmail[0]) ||
      illegalChars.test(arrEmail2[0]) ||
      illegalChars.test(arrEmail2[1])
    )
      return language.generalError2;

    if (!emailPattern.test(value)) return language.emailError6;
  } else if (rules.isPassword) {
    if (illegalChars.test(value)) return language.generalError2;

    if (value.length < 8) {
      return language.passwordError1;
    }

    if (value.search(checkNumeric2) === -1)
      return language.passwordError2;
    if (!checkUpper.test(value)) return language.passwordError3;
    if (!checkLower.test(value)) return language.passwordError4;
  } else if (rules.ip) {
    if (!ipAddress.test(value)) return language.ipError;


  }
  else if (rules.number) {
    if (rules.max && rules.max < value) return language.maxError;
    if (rules.min && rules.min > value) return language.minError;


  }
  return "";
};
