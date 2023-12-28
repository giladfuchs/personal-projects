import { _failed_api } from ".";
import {  updateObject } from "../../services";
import * as actions from "../../common/types/redux";
export const start = (state: actions.GeneralState) => {
  return updateObject(state, {
    loading: true,
  });
};
export const api_false = (state: actions.GeneralState) => {
  return updateObject(state, {
    success_api: false, 
    error:''

  });
};

export const logout = (
  state: actions.GeneralState,
) => {
  
  return updateObject(state, {
    loading: false,
    isTokenSet: false
  });
};

export const faild = (
  state: actions.GeneralState,
  action: actions.faildApiActionType | actions.faildAuthActionType
) => {
  
  return updateObject(state, {
    loading: false,
    ..._failed_api,
    error: action.error
  });
};
export const successAuth = (
  state: actions.GeneralState,
  action: actions.successAuthctionType
) => {
  return updateObject(state, {
    loading: false,
    error: '',

    isTokenSet: true,
  });
};


export const successApi = (
  state: actions.GeneralState,
  action:  actions.successApiActionType
) => {
  return updateObject(state, {
    loading: false,
    error: '',
    accounts_users:action.accounts_users, 
    accounts:action.accounts, 
    devices:action.devices, 
    networks:action.networks, 
    isTokenSet: true,
  });
};

