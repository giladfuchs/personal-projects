import { dataActionsEnum } from "../../state/data.types";
import { Day, API } from "../../../../models";
import {
  GeneralActionsEnum,
  falidBusineesDetailsErrorHandler,
} from "../../../general";

// Put and Post

export const postEmployeeSchedule = (schedule: Day) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_BUSINESS_DETAILS });
      await API.post("admin/details/hours", schedule);

      dispatch({
        type: dataActionsEnum.SUCCESS_POST_EMPLOYEE_SCHEDULE,
        schedule,
      });

      dispatch({ type: GeneralActionsEnum.SUCCESS_DATA });
      return;
    } catch (error) {
      falidBusineesDetailsErrorHandler(dispatch, error);
    }
  };
};
