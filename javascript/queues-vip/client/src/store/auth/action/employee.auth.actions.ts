import { Dispatch } from "react";

import { AuthActionsEnum, setDomainsActionType } from "..";
import {
  GeneralActionsEnum,
  startAuthActionType,
  successAuthctionType,
  falidAuthErrorHandler,
} from "../../general";
import { Employee, API } from "../../../models";

export const getAllDomains = () => {
  return async (
    dispatch: Dispatch<
      startAuthActionType | successAuthctionType | setDomainsActionType
    >
  ) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_AUTH });
      const res = await API.get("admin/auth/check");
      const domains = res.data.domains;
      dispatch({ type: AuthActionsEnum.SET_DOMAINS, domains });
      dispatch({ type: GeneralActionsEnum.SUCCESS_AUTH });
      return;
    } catch (error) {
      falidAuthErrorHandler(dispatch, error);
    }
  };
};
export const registerFirstEmployee = (employee: Employee) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_AUTH });

      const res = await API.post("admin/auth/first-register", employee);
      const details = { ...res.data.employee, firstName: res.data.authPass };
      delete details._id;
      const person = { _id: res.data.employee._id, details };

      dispatch({
        type: AuthActionsEnum.SET_PERSON,
        person,
      });
      dispatch({ type: GeneralActionsEnum.INCREMENT });

      dispatch({ type: GeneralActionsEnum.SUCCESS_AUTH });
      return;
    } catch (error) {
      falidAuthErrorHandler(dispatch, error);
    }
  };
};
export const aprroveRegisterFirstEmployee = (authPass: any) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_AUTH });

      const res = await API.post("admin/auth/approve-first-register", authPass);
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", "true");

      dispatch({ type: GeneralActionsEnum.INCREMENT });
      dispatch({ type: GeneralActionsEnum.SUCCESS_SET_TOKEN });
      return;
    } catch (error) {
      falidAuthErrorHandler(dispatch, error);
    }
  };
};

export const loginEmployee = (form: { phone: string; password: string }) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_AUTH });

      const res = await API.post("admin/auth/login", form);

      const token = res.data.token;
      const domain = res.data.domain;

      localStorage.setItem("token", token);
      localStorage.setItem("domain", domain);
      localStorage.setItem("isAdmin", "true");

      dispatch({ type: GeneralActionsEnum.SUCCESS_SET_TOKEN });

      return;
    } catch (error) {
      falidAuthErrorHandler(dispatch, error);
    }
  };
};

export const resetPasswordEmployee = (phone: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_AUTH });
      const res = await API.post("admin/auth/sendResetMessage", { phone });
      console.log(res.data.token);

      return dispatch({ type: GeneralActionsEnum.SUCCESS_SEND_TOKEN_MSG });
    } catch (error) {
      falidAuthErrorHandler(dispatch, error);
    }
  };
};

export const setNewPasswordEmployee = (password: string, token: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_AUTH });
      const res = await API.post("admin/auth/resetPassword/" + token, password);

      const domain = res.data.domain;
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("domain", domain);
      localStorage.setItem("isAdmin", "true");

      dispatch({ type: GeneralActionsEnum.SUCCESS_SET_TOKEN });
      return;
    } catch (error) {
      falidAuthErrorHandler(dispatch, error);
    }
  };
};
