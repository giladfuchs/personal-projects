import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import sushiBuilderReducer from "./store/reducers/sushiBuilder";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
import itemsReducer from "./store/reducers/sushiItems";
import cartReducer from "./store/reducers/cart";

import {
  watchAuth,
  watchsushiBuilder,
  watchOrder,
  watchsushiItems,
  watchCart,
} from "./store/sagas";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  sushiBuilder: sushiBuilderReducer,
  order: orderReducer,
  auth: authReducer,
  sushiItems: itemsReducer,
  cart: cartReducer,
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchsushiBuilder);
sagaMiddleware.run(watchsushiItems);
sagaMiddleware.run(watchCart);

sagaMiddleware.run(watchOrder);
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
