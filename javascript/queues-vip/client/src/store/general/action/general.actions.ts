import { dataActionsEnum } from "../../data/state/data.types";
import { GeneralActionsEnum } from "../state/general.types";
import { API } from "../../../models/axios/axios";

import { AuthActionsEnum } from "../../auth/state/auth.types";
import { falidAuthErrorHandler } from "./index.actions";

export const LoginCheck = () => {
  const token = localStorage.getItem("token");
  const domain = localStorage.getItem("domain");
  // dispatch;
  if (!token || !domain) {
    return {
      type: AuthActionsEnum.LOGIN_CHECK_FAILD,
    };
  }
  return async (dispatch: any) => {
    dispatch({
      type: GeneralActionsEnum.START_AUTH,
    });
    try {
      if (localStorage.getItem("isAdmin")) {
        const res = await API.get("admin");

        const business = res.data.business;
        const employee = res.data.employee.details;
        const services = res.data.services;
        const schedule = res.data.employee.schedule;
        const person = {
          _id: res.data.employee._id,
          details: res.data.employee.details,
        };

        const mat = res.data.mat;
        const days = res.data.days;

        // dispatch({
        //   type: dataActionsEnum.SUCCESS_SET_CALENDAR,
        //   mat,
        //   days,
        // });
        dispatch({
          type: dataActionsEnum.SUCCESS_GET_ALL_DATA,
          services,
          business,
          schedule,
          employee,
          mat,
          days,
        });

        dispatch({
          type: AuthActionsEnum.SET_PERSON,
          person,
        });
        dispatch({
          type: GeneralActionsEnum.SUCCESS_EMPLOYEE_LOGIN_AUTH,
        });
        return;
      } else {
        const res = await API.get(domain);
        // console.log(res.data.queues);

        const person = res.data.client;

        const business = res.data.business;
        const employee = res.data.employee.details;
        const services = res.data.services;
        const schedule = res.data.employee.schedule;

        // const mat = res.data.mat;
        // const days = res.data.days;

        dispatch({
          type: dataActionsEnum.SUCCESS_GET_ALL_DATA,
          services,
          business,
          schedule,
          employee,
          // mat,
          // days,
        });

        dispatch({
          type: AuthActionsEnum.SET_PERSON,
          person,
        });
        dispatch({
          type: GeneralActionsEnum.SUCCESS_CLIENT_LOGIN_AUTH,
        });
        return;
      }
    } catch (error) {
      falidAuthErrorHandler(dispatch, error);
    }
  };
};
