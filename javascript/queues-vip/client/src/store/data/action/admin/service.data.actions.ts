import { Service, API } from "../../../../models";
import { dataActionsEnum } from "../../state/data.types";

import { falidServiceErrorHandler, GeneralActionsEnum } from "../../../general";

export const postService = (service: Service) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_SERVICE });
      const res = await API.post("admin/service", service);

      dispatch({
        type: dataActionsEnum.SUCCESS_POST_SERVICE,
        service: res.data.service,
      });

      dispatch({ type: GeneralActionsEnum.SUCCESS_SERVICE });
      return;
    } catch (error) {
      falidServiceErrorHandler(dispatch, error);
    }
  };
};

export const updateService = (service: Service) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_SERVICE });
      await API.put("admin/service", service);

      dispatch({
        type: dataActionsEnum.SUCCESS_UPDATE_SERVICE,
        service,
      });

      dispatch({ type: GeneralActionsEnum.SUCCESS_SERVICE });
      return;
    } catch (error) {
      falidServiceErrorHandler(dispatch, error);
    }
  };
};

export const deleteService = (service: Service) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_SERVICE });
      await API.delete("admin/service", {
        headers: {
          _id: service._id,
        },
      });

      dispatch({
        type: dataActionsEnum.SUCCESS_DELETE_SERVICE,
        serviceId: service._id,
      });
      dispatch({ type: GeneralActionsEnum.SUCCESS_SERVICE });
      return;
    } catch (error) {
      falidServiceErrorHandler(dispatch, error);
    }
  };
};
