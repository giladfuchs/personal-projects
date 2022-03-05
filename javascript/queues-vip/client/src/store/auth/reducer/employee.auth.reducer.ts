import * as actions from "../state/auth.types";
import { updateObject } from "../../../assets/utility/utility";

export const signInCheckFaild = (state: actions.AuthState) => {
  return updateObject(state, { loading: false, error: "" });
};

export const successGetDomains = (
  state: actions.AuthState,
  action: actions.setDomainsActionType
) => {
  return updateObject(state, {
    loading: false,
    error: "",
    domains: action.domains,
  });
};

export const setPerson = (
  state: actions.AuthState,
  action: actions.setPersonActionType
) => {
  return updateObject(state, {
    person: action.person,
  });
};
