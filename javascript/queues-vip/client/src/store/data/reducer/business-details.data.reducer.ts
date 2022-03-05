import * as actions from "../state/data.types";
import { updateObject } from "../../../assets/utility/utility";

export const successSetDetails = (
  state: actions.dataState,
  action: actions.successPostBusinessDetailsActionType
) => {
  return updateObject(state, {
    business: action.business,
  });
};
