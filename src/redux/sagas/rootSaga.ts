import { all } from 'redux-saga/effects';

import getScheduleWatcher from './get-schedule';
import setUserWatcher from './set-user-saga';

export default function* rootSaga() {
  yield all([
    setUserWatcher(),
    getScheduleWatcher(),
  ]);
}
