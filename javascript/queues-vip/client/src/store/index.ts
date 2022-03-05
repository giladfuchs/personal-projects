import { combineReducers } from "redux";
import { authReducer } from "./auth/reducer/index.auth.reducer";
import { dataReducer } from "./data/reducer/index.data.reducer";
import { generalReducer } from "./general/reducer/index.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
  general: generalReducer,
});

export const errorApi = (error: {
  response: { data?: { message?: string } };
  message: string;
}) =>
  error.response && error.response.data
    ? error.response.data.message
    : error.message;

export * from "./auth/index";
export * from "./data/index";
export * from "./general/index";
