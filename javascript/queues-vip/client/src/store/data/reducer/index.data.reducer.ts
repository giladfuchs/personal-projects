import {
  successPostService,
  successUpadateService,
  successDeleteService,
} from "./service.data.reducer";
import { initialDataState } from "../state/data.state";

import * as actions from "../state/data.types";
import { updateObject } from "../../../assets/utility/utility";
import { successSetHours } from "./schedule-employee.data.reducer";
import { successSetDetails } from "./business-details.data.reducer";
import { successSetCalendar, updateMatrix } from "./calendar.data.reducer";
type allDataActionTypes =
  | actions.successPostEmployeeScheduleActionType
  | actions.successPostServicesActionType
  | actions.successUpdateServiceActionType
  | actions.successGetAllDataActionType
  | actions.successDeleteServiceActionType
  | actions.successPostBusinessDetailsActionType
  | actions.updateMatrixScheduleActionType;

const successGetAllData = (
  state: actions.dataState,
  action: actions.successGetAllDataActionType
) => {
  return updateObject(state, {
    services: action.services,
    business: action.business,
    employee: action.employee,
    schedule: action.schedule,
    mat: action.mat ? action.mat : [],
    days: action.days ? action.days : [],
  });
};

export const dataReducer = (
  state = initialDataState,
  action: allDataActionTypes | actions.successSetCalendarActionType
) => {
  switch (action.type) {
    case actions.dataActionsEnum.SUCCESS_SET_CALENDAR:
      return successSetCalendar(state, action);
    case actions.dataActionsEnum.UPDATE_MATRIX:
      return updateMatrix(state, action);
    case actions.dataActionsEnum.SUCCESS_GET_ALL_DATA:
      return successGetAllData(state, action);

    //employe scheduale
    case actions.dataActionsEnum.SUCCESS_POST_EMPLOYEE_SCHEDULE:
      return successSetHours(state, action);

    //business details
    case actions.dataActionsEnum.SUCCESS_POST_BUSINESS_DETAILS:
      return successSetDetails(state, action);

    //service
    case actions.dataActionsEnum.SUCCESS_POST_SERVICE:
      return successPostService(state, action);

    case actions.dataActionsEnum.SUCCESS_UPDATE_SERVICE:
      return successUpadateService(state, action);

    case actions.dataActionsEnum.SUCCESS_DELETE_SERVICE:
      return successDeleteService(state, action);

    default:
      return state;
  }
};
