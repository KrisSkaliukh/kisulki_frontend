import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import getGroupAPI from '../../api/get-groups';
import { receiveGetGroups, rejectGetGroups, requestGetGroups } from '../actions';

const getGroups = function* getGroups() {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const groups = yield call(getGroupAPI);
    yield put(receiveGetGroups({ groups }));
  } catch (error) {
    yield put(rejectGetGroups({ error }));
  }
};

export default function* getGroupsWatcher() {
  yield takeLatest(requestGetGroups, getGroups);
}
