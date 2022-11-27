/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import getUsersAPI from '../../api/get-users';
import { receiveUsers, rejectUsers, requestUsers } from '../actions';

interface IAction {
  type: string;
  payload: any;
}

const getSchedule = function* getSchedule(action: IAction) {
  try {
    // @ts-ignore
    const users = yield call(getUsersAPI, { lectureId: action.payload.id });
    console.log(users);
    yield put(receiveUsers({ lectureUsers: users }));
  } catch (error) {
    console.log(error);
    yield put(rejectUsers({ error }));
  }
};

export default function* getUsersWatcher() {
  yield takeLatest(requestUsers, getSchedule);
}
