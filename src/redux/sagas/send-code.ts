import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import sendCodeAPI from '../../api/send-code';
import { receiveCodeSend, rejectCodeSend, requestCodeSend } from '../actions';

interface IAction {
  type: string;
  payload: any;
}

const sendCode = function* sendCode(action: IAction) {
  try {
    yield call(sendCodeAPI, action.payload.userId, action.payload.lectureId, action.payload.code);
    yield put(receiveCodeSend());
  } catch (error) {
    yield put(rejectCodeSend({ error }));
  }
};

export default function* sendCodeWatcher() {
  yield takeLatest(requestCodeSend, sendCode);
}
