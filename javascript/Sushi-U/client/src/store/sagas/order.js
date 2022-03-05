import { put } from "redux-saga/effects";
import axios from "../../axios-api";
import * as actions from "../actions/index";

export function* purchasesushi(action) {
  try {

    console.log(action.orderData);

    yield put(actions.purchasesushiStart());
    const session = yield axios.post("/order/order", action.orderData);
    const stripe = action.stripe;
    console.log(session);

    const result = yield stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
    yield put(actions.purchasesushiSuccess());
  } catch (error) {
    console.log(error);

    yield put(actions.purchasesushiFail());
  }
}
export function* fetchOrders(action) {
  yield put(actions.fetchOrderStart());


  try {
    const response = yield axios.get("/order/orders");
    yield put(actions.fetchOrderSuccess({ ...response.data }));
  } catch (error) {
    yield put(actions.fetchOrderFail(error));
  }
}
