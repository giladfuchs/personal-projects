import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    Stripe: any;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  // <React.StrictMode>

  <Provider store={store}>
  <Suspense fallback={<div>Loading... </div>}>

      <App  />
      </Suspense>

  </Provider>
//  </React.StrictMode> 
  ,
  document.getElementById("root")
);
