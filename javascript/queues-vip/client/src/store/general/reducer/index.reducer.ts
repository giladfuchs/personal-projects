import * as actions from "../state/general.types";
import { initialGeneralState } from "../index";
import * as actionReducer from "./general.reducer";
type allAuthActionTypes =
  | actions.startDetailsActionType
  | actions.startAuthActionType
  | actions.startServiceActionType
  | actions.startQueueActionType
  | actions.successAuthctionType
  | actions.successDataActionType
  | actions.successServiceActionType
  | actions.successQueueActionType
  | actions.faildDetailsActionType
  | actions.faildServiceActionType
  | actions.faildAuthActionType
  | actions.faildQueueActionType
  | actions.DECREMENT
  | actions.INCREMENT
  | actions.logoutActionType
  | actions.successEmployeeLoginAuthActionType
  | actions.successClientLoginAuthActionType
  | actions.successSendTokenMsgActionType
  | actions.successSetNewPasswordActionType
  | actions.successSetTokenActionType;

export const generalReducer = (
  state = initialGeneralState,
  action: allAuthActionTypes
) => {
  switch (action.type) {
    //start
    case actions.GeneralActionsEnum.START_AUTH:

    case actions.GeneralActionsEnum.START_SERVICE:

    case actions.GeneralActionsEnum.START_BUSINESS_DETAILS:

    case actions.GeneralActionsEnum.START_QUEUE:
      return actionReducer.start(state);

    //faild
    case actions.GeneralActionsEnum.FALID_AUTH:

    case actions.GeneralActionsEnum.FALID_SERVICE:

    case actions.GeneralActionsEnum.FALID_BUSINESS_DETAILS:

    case actions.GeneralActionsEnum.FALID_QUEUE:
      return actionReducer.faild(state, action);

    //success
    case actions.GeneralActionsEnum.SUCCESS_DATA:

    case actions.GeneralActionsEnum.SUCCESS_AUTH:

    case actions.GeneralActionsEnum.SUCCESS_SERVICE:

    case actions.GeneralActionsEnum.SUCCESS_QUEUE:
      return actionReducer.successAction(state);

    //inrenent dectement
    case actions.GeneralActionsEnum.DECREMENT:
      return actionReducer.decrement(state);

    case actions.GeneralActionsEnum.INCREMENT:
      return actionReducer.increment(state);

    //other login logout
    case actions.GeneralActionsEnum.LOGOUT:
      return actionReducer.successLogout(state);

    case actions.GeneralActionsEnum.SUCCESS_SET_TOKEN:
      return actionReducer.successSetToken(state);

    case actions.GeneralActionsEnum.SUCCESS_EMPLOYEE_LOGIN_AUTH:
      return actionReducer.successEmployeeLogin(state);

    case actions.GeneralActionsEnum.SUCCESS_CLIENT_LOGIN_AUTH:
      return actionReducer.successClientLogin(state);

    case actions.GeneralActionsEnum.SUCCESS_SEND_TOKEN_MSG:
      return actionReducer.successAction(state);

    case actions.GeneralActionsEnum.SUCCESS_SET_NEW_PASSWORD:
      return actionReducer.successEmployeeLogin(state);

    default:
      return state;
  }
};
