/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import getLectures from '../../api/get-lectures';
import { receiveGetSchedule, rejectGetSchedule, requestGetSchedule } from '../actions';

interface IAction {
  type: string;
  payload: any;
}

const getSchedule = function* getSchedule(action: IAction) {
  try {
    // @ts-ignore
    const lessons = yield call(getLectures, {
      groupId: action.payload.groupId,
      surname: action.payload.surname,
    });
    console.log(lessons);
    yield put(receiveGetSchedule({ lessons }));
  } catch (error) {
    console.log(error);
    yield put(rejectGetSchedule({ error }));
  }
};

export default function* getScheduleWatcher() {
  yield takeLatest(requestGetSchedule, getSchedule);
}
