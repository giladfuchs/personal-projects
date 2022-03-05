import * as actions from "..";

import * as employeeReducer from "./employee.auth.reducer";
import * as domainReducer from "./domain.auth.reducer";

type allAuthActionTypes =
  | actions.signInCheckActionType
  | actions.setDomainsActionType
  | actions.setPersonActionType
  | actions.domainIsValidActionType;

export const authReducer = (
  state = actions.initialAuthState,
  action: allAuthActionTypes
) => {
  switch (action.type) {
    case actions.AuthActionsEnum.DOMAIN_IS_VALID:
      return domainReducer.domainIsValid(state);

    //emloyee

    case actions.AuthActionsEnum.LOGIN_CHECK_FAILD:
      return employeeReducer.signInCheckFaild(state);

    case actions.AuthActionsEnum.SET_DOMAINS:
      return employeeReducer.successGetDomains(state, action);

    case actions.AuthActionsEnum.SET_PERSON:
      return employeeReducer.setPerson(state, action);

    default:
      return state;
  }
};
