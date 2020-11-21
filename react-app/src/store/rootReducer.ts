import { combineReducers } from '@reduxjs/toolkit';
import localStreamMeta from './slices/localStreamMeta';
import remoteStreamMetas from './slices/remoteStreamMetas';

const rootReducer = combineReducers({
  localStreamMeta,
  remoteStreamMetas
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
