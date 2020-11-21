import { combineReducers } from "@reduxjs/toolkit";
import streamMetas from "./slices/streamMetas";

const rootReducer = combineReducers({
  streamMetas,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
