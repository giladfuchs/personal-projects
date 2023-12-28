import { combineReducers } from "redux";
import { reducer } from "./reducer/reducer";

export const rootReducer = combineReducers({
  reducer: reducer,
});

export * from "./action";
export * from "./state";

export * from "../common/types";

export type RootState = ReturnType<typeof rootReducer>;
