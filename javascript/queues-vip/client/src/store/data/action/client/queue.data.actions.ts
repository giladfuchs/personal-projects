import { Queue, API, ServiceListQueue, serverUrl } from "../../../../models";
import { dataActionsEnum } from "../..";

import { GeneralActionsEnum, falidQueueErrorHandler } from "../../../general";
import openSocket from "socket.io-client";

export const setServiceToQueue = (servicesList: ServiceListQueue) => {
  return async (dispatch: any) => {
    try {
      const socket = openSocket(serverUrl);
      socket.on("queue", (data: any) => {
        if (data.action === localStorage.getItem("domain")) {
          dispatch({
            type: dataActionsEnum.UPDATE_MATRIX,
            queue: data.queue,
          });
        }
      });
      dispatch({ type: GeneralActionsEnum.START_QUEUE });
      const res = await API.post(
        localStorage.getItem("domain") + "/calendar/setServiceToQueue",
        servicesList
      );
      const mat = res.data.mat;
      const days = res.data.days;
      const startMinTime = res.data.startMinTime;
      const timeDistance = res.data.timeDistance;
      const durationOfNewQueue = res.data.durationOfNewQueue;
      const price = res.data.price;

      dispatch({
        type: dataActionsEnum.SUCCESS_SET_CALENDAR,
        mat,
        days,
        durationOfNewQueue,
        startMinTime,
        timeDistance,
        price,
      });

      dispatch({ type: GeneralActionsEnum.SUCCESS_QUEUE });
      return;
    } catch (error) {
      falidQueueErrorHandler(dispatch, error);
    }
  };
};

export const updateScheduleWeek = (queue: Queue, stripe: any) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_QUEUE });
      const methood = stripe ? "card" : "cash";
      const res = await API.post(
        localStorage.getItem("domain") + "/calendar/" + methood,
        queue
      );
      stripe &&
        stripe.redirectToCheckout({
          sessionId: res.data.session.id,
        });
      dispatch({
        type: dataActionsEnum.UPDATE_MATRIX,
        queue: res.data.queue,
      });
      dispatch({
        type: GeneralActionsEnum.SUCCESS_QUEUE,
      });

      return;
    } catch (error) {
      falidQueueErrorHandler(dispatch, error);
    }
  };
};
