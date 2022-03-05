import { AuthState } from "..";
import { updateObject } from "../../../assets";

export const domainIsValid = (state: AuthState) => {
  return updateObject(state, {
    isValidDomain: true,
  });
};
