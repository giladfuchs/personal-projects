import { GeneralState } from "./general.types";

export const initialGeneralState: GeneralState = {
  error: "",
  loading: false,
  isLogin: false,
  isAdmin: false,
  isTokenSet: false,
  step: 1,
};
