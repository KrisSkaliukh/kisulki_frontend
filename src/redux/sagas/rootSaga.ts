import { all } from 'redux-saga/effects';

import getScheduleWatcher from './get-schedule';
import sendCodeWatcher from './send-code';
import setUserWatcher from './set-user-saga';

export default function* rootSaga() {
  yield all([
    setUserWatcher(),
    getScheduleWatcher(),
    sendCodeWatcher(),
  ]);
}
