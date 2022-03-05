import * as language from "../../../../assets/language/language";
import { InputField } from "../../../system/input.field";

export const password: InputField = {
  elementType: "input",
  type: "password",
  elementConfig: {
    id: "new-password",
    placeholder: language.password[1],
  },

  value: "",
  label: language.password[1],
  name: language.password[1],
  validation: {
    required: true,
    minLen: 6,
  },
  valid: false,
  touched: false,
  error: "",
  editable: true,
  class: "border",
};

export const phone: InputField = {
  elementType: "input",
  type: "text",
  elementConfig: {
    id: "tel-local",
    placeholder: language.phone[1],
  },
  value: "",
  label: language.phone[1],
  name: language.phone[1],
  validation: {
    required: true,
    isPhone: true,
  },
  valid: false,
  touched: false,
  error: "",
  editable: true,
  class: "border",
};

export const plainText: InputField = {
  elementType: "input",
  type: "text",
  elementConfig: {
    id: "text",
    placeholder: language.firstName[1],
  },
  value: "",
  label: language.firstName[1],
  name: language.firstName[1],
  validation: {
    required: true,
    minLen: 2,
  },
  valid: false,
  touched: false,
  error: "",
  class: "border",
  editable: true,
};

export const domain: InputField = {
  elementType: "input",
  type: "text",
  elementConfig: {
    id: "text",
    placeholder: language.domainTitle[1],
  },
  value: "",
  label: language.domainTitle[1],
  name: language.domainTitle[1],
  validation: {
    required: true,
    minLen: 2,
    isEnglish: true,
  },
  valid: false,
  touched: false,
  error: "",
  class: "border",
  editable: true,
};

export const email: InputField = {
  elementType: "input",
  type: "text",
  elementConfig: {
    id: "email",
    placeholder: language.email[1],
  },
  value: "",
  label: language.email[1],
  name: language.email[1],
  validation: {
    required: true,
    isEmail: true,
  },
  valid: false,
  touched: false,
  error: "",
  class: "border",
  editable: true,
};
