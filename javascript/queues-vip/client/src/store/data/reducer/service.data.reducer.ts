import * as actions from "../state/data.types";
import { updateObject } from "../../../assets/utility/utility";

export const successPostService = (
  state: actions.dataState,
  action: actions.successPostServicesActionType
) => {
  const services = [...state.services];
  services.push(action.service);
  return updateObject(state, {
    services: services,
  });
};

export const successUpadateService = (
  state: actions.dataState,
  action: actions.successUpdateServiceActionType
) => {
  const updateServices = [...state.services].filter(
    (s) => s._id !== action.service._id
  );
  updateServices.push(action.service);

  return updateObject(state, {
    services: updateServices,
  });
};

export const successDeleteService = (
  state: actions.dataState,
  action: actions.successDeleteServiceActionType
) => {
  return updateObject(state, {
    services: state.services.filter((s) => s._id !== action.serviceId),
  });
};
