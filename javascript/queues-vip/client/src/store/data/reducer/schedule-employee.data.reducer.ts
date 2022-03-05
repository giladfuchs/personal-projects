import * as actions from "../state/data.types";
import { updateObject } from "../../../assets/utility/utility";

export const successSetHours = (
  state: actions.dataState,
  action: actions.successPostEmployeeScheduleActionType
) => {
  return updateObject(state, {
    schedule: action.schedule,
  });
};
