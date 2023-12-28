import { AccountUserForm, InputField } from "../..";
import * as language from "../../../../assets/language";

export const password: InputField = {
  id: "outlined-password-input",
  label: language.password,
  type: language.password,
  autoComplete: "current-password",
  error: false,
  helperText: "",
  value: "",
  validation: {
     isPassword: true,
  },
  valid: false,
  touched: false,
};

export const username: InputField = {
  id: "username",
  label: 'username',
  type: 'username',
  autoComplete: "username",
  error: false,
  helperText: "",
  value: "",
  validation: {

  },
  valid: false,
  touched: false,
};

export const email: InputField = {
  id: "email",
  label: language.email,
  type: language.email,
  autoComplete: "current-email",
  error: false,
  helperText: "",
  value: "",
  validation: {
    isEmail: true,
  },
  valid: false,
  touched: false,
};


export const mask: InputField = {
  id:  language.mask,
  label: language.mask,
  type: "number",
  autoComplete: "mask",
  error: false,
  helperText: "",
  value: "",
  validation: {
    number: true,
    min: 10,
    max: 32,
  },
  valid: false,
  touched: false,
};

export const blackhole_threshold: InputField = {
  id:  language.mask,
  label: language.mask,
  type: "number",
  autoComplete: "mask",
  error: false,
  helperText: "",
  value: "",
  validation: {
    number: true,
    min: 60,
    max: 100,
  },
  valid: false,
  touched: false,
};

export const account_bandwidth_mbps: InputField = {
  id:  language.mask,
  label: language.mask,
  type: "number",
  autoComplete: "mask",
  error: false,
  helperText: "",
  value: "",
  validation: {
    number: true,
    min: 1,
  },
  valid: false,
  touched: false,
};

export const ip: InputField = {
  id:  language.ip,
  label: language.ip,
  type: language.ip,
  autoComplete: "ip",
  error: false,
  helperText: "",
  value: "",
  validation: {
    ip: true,
  },
  valid: false,
  touched: false,
};


// export const checkbox = {
//   label: 'check',
//   checked:true
// };

