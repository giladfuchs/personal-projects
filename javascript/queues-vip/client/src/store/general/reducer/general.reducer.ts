import * as actions from "../state/general.types";
import { updateObject } from "../../../assets/utility/utility";

export const start = (state: actions.GeneralState) => {
  return updateObject(state, {
    loading: true,
    error: "",
  });
};

export const faild = (
  state: actions.GeneralState,
  action:
    | actions.faildDetailsActionType
    | actions.faildServiceActionType
    | actions.faildAuthActionType
    | actions.faildQueueActionType
) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};
export const successAction = (state: actions.GeneralState) => {
  return updateObject(state, {
    ...success(),
  });
};

export const increment = (state: actions.GeneralState) => {
  const step = state.step + 1;
  return updateObject(state, {
    step,
  });
};
export const decrement = (state: actions.GeneralState) => {
  const step = state.step - 1;
  return updateObject(state, {
    step,
  });
};

export const successLogout = (state: actions.GeneralState) => {
  return updateObject(state, {
    isLogin: false,
    isAdmin: false,
    isTokenSet: false,
  });
};

export const successSetToken = (state: actions.GeneralState) => {
  return updateObject(state, {
    isTokenSet: true,
  });
};

export const successEmployeeLogin = (state: actions.GeneralState) => {
  return updateObject(state, {
    ...success(),
    isLogin: true,
    isAdmin: true,
  });
};

export const successClientLogin = (state: actions.GeneralState) => {
  return updateObject(state, {
    ...success(),
    isLogin: true,
  });
};

const success = () => ({
  loading: false,
  error: "",
});
