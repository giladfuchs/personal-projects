import * as actionReducer from ".";
import * as actions from "../../common/types/redux";
import { initialGeneralState } from "../state/init_state";

type allDataActionTypes =
  | actions.startApiActionType
  | actions.startAuthActionType
  | actions.successAuthctionType
  | actions.successApiActionType
  | actions.faildAuthActionType
  | actions.deleteUserActionType
  | actions.addUserActionType
  | actions.falseApiActionType
  | actions.logoutActionType
  | actions.updateUserActionType
  | actions.faildApiActionType;

// if I put some case and it's not in allDataActionTypes it's say problem..
// but if i miss some case that in allDataActionTypes it's not say nothing
export const reducer = (
  state = initialGeneralState,
  action: allDataActionTypes 
) => {
  switch (action.type) {
    //auth
    case actions.GeneralActionsEnum.START_AUTH:
    case actions.GeneralActionsEnum.START_API:
      return actionReducer.start(state);
    case actions.GeneralActionsEnum.FALID_AUTH:
    case actions.GeneralActionsEnum.FALID_API:
      return actionReducer.faild(state, action);
    case actions.GeneralActionsEnum.SUCCESS_AUTH:
      return actionReducer.successAuth(state, action);
    case actions.GeneralActionsEnum.SUCCESS_LOGOUT:
        return actionReducer.logout(state);
  
    case actions.GeneralActionsEnum.SUCCESS_API:
      return actionReducer.successApi(state, action);

      // table
    case actions.GeneralActionsEnum.DELETE_TABLE:
      return actionReducer.delete_row(state, action);

    case actions.GeneralActionsEnum.ADD_TABLE:
      return actionReducer.add_row(state, action);

    case actions.GeneralActionsEnum.UPDATE_TABLE:
      return actionReducer.update_row(state, action);


    case actions.GeneralActionsEnum.API_FALSE:
      return actionReducer.api_false(state);


    default:
      return state;
  }
};
