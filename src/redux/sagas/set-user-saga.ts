import {
  put,
  takeLatest,
} from 'redux-saga/effects';

import { receiveSetUser, rejectSetUser, requestSetUser } from '../actions';

interface ISetUserAction {
  type: string;
  payload: {
    user: any;
  }
}

const setUser = function* setUser(action: ISetUserAction) {
  try {
    console.log(action.payload.user);
    yield put(receiveSetUser({ user: action.payload }));
  } catch (error) {
    yield put(rejectSetUser({ error }));
  }
};

export default function* setUserWatcher() {
  yield takeLatest(requestSetUser, setUser);
}
