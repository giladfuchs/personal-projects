import { dataActionsEnum } from "../../state/data.types";
import { BusinessDetails, API } from "../../../../models";
import {
  GeneralActionsEnum,
  falidBusineesDetailsErrorHandler,
} from "../../../general";

// Put and Post

export const postBusinessDetails = (form: BusinessDetails) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_BUSINESS_DETAILS });
      await API.post("admin/details", form);
      dispatch({
        type: dataActionsEnum.SUCCESS_POST_BUSINESS_DETAILS,
        business: form,
      });
      dispatch({ type: GeneralActionsEnum.SUCCESS_DATA });
      return;
    } catch (error) {
      falidBusineesDetailsErrorHandler(dispatch, error);
    }
  };
};
