import { combineReducers } from '@reduxjs/toolkit';
import localStreamMeta from './slices/localStreamMeta';
import streamMetas from "./slices/streamMetas";

const rootReducer = combineReducers({
  localStreamMeta,
  streamMetas,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
