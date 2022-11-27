import {
  put,
  takeLatest,
} from 'redux-saga/effects';

import { receiveCodeSend, rejectCodeSend, requestCodeSend } from '../actions';

const sendCode = function* sendCode() {
  try {
    yield put(receiveCodeSend());
  } catch (error) {
    yield put(rejectCodeSend({ error }));
  }
};

export default function* sendCodeWatcher() {
  yield takeLatest(requestCodeSend, sendCode);
}
