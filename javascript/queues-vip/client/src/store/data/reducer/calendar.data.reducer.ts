import moment from "moment";
import * as actions from "../state/data.types";
import { updateObject } from "../../../assets/utility/utility";

export const successSetCalendar = (
  state: actions.dataState,
  action: actions.successSetCalendarActionType
) => {
  return updateObject(state, {
    mat: action.mat,
    days: action.days,
    durationOfNewQueue: action.durationOfNewQueue,
    startMinTime: action.startMinTime,
    timeDistance: action.timeDistance,
    price: action.price,
  });
};

export const updateMatrix = (
  state: actions.dataState,
  action: actions.updateMatrixScheduleActionType
) => {
  const formatHour = "HH:mm";

  const queueHour = moment(action.queue.hour, formatHour);
  const start = moment(state.startMinTime, formatHour);

  var duration = moment.duration(queueHour.diff(start)).asMinutes();

  var index = duration / state.timeDistance;
  const day = state.days.indexOf(action.queue.day);
  const mat = [...state.mat];

  for (
    var i = index;
    i < index + action.queue.duration / state.timeDistance;
    ++i
  )
    mat[i][day] = false;

  return updateObject(state, { mat });
};
