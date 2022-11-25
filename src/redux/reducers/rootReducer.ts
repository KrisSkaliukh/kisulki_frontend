import { combineReducers } from 'redux';

import mainReducer from './mainReducer';

export const RootReducer = combineReducers({
  mainReducer,
});

export type RootState = ReturnType<typeof RootReducer>
