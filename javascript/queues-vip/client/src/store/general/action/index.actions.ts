import { GeneralActionsEnum } from "../state/general.types";

import { errorApi } from "../..";

//step
export const decrement = () => {
  return (dispatch: any) => {
    return dispatch({ type: GeneralActionsEnum.DECREMENT });
  };
};

export const incrementent = () => {
  return (dispatch: any) => {
    return dispatch({ type: GeneralActionsEnum.INCREMENT });
  };
};

//faild
export const falidBusineesDetailsErrorHandler = (dispatch: any, error: any) => {
  return dispatch({
    type: GeneralActionsEnum.FALID_BUSINESS_DETAILS,
    error: errorApi(error),
  });
};

export const falidServiceErrorHandler = (dispatch: any, error: any) => {
  return dispatch({
    type: GeneralActionsEnum.FALID_SERVICE,
    error: errorApi(error),
  });
};
export const falidAuthErrorHandler = (dispatch: any, error: any) => {
  return dispatch({
    type: GeneralActionsEnum.FALID_AUTH,
    error: errorApi(error),
  });
};

export const falidQueueErrorHandler = (dispatch: any, error: any) => {
  return dispatch({
    type: GeneralActionsEnum.FALID_AUTH,
    error: errorApi(error),
  });
};

// isAdmin | isLogin
export const logoutEmployee = () => {
  return (dispatch: any) => {
    localStorage.clear();
    return dispatch({ type: GeneralActionsEnum.LOGOUT });
  };
};
