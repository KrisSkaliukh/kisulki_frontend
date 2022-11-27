import { all } from 'redux-saga/effects';

import getGroupsWatcher from './get-groups';
import getScheduleWatcher from './get-schedule';
import getUsersWatcher from './get-users';
import sendCodeWatcher from './send-code';
import sendGroupWatcher from './send-group';
import setUserWatcher from './set-user-saga';

export default function* rootSaga() {
  yield all([
    setUserWatcher(),
    getScheduleWatcher(),
    sendCodeWatcher(),
    getGroupsWatcher(),
    sendGroupWatcher(),
    getUsersWatcher(),
  ]);
}
