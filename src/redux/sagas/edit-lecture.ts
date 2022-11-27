import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import editLectureAPI from '../../api/edit-lecture';
import { receiveLectureEdit, rejectLectureEdit, requestLectureEdit } from '../actions';

interface IAction {
  type: string;
  payload: any;
}

const editLecture = function* editLecture(action: IAction) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const lectureUsers = yield call(editLectureAPI, action.payload.lectionId, action.payload.lectureUsers);
    yield put(receiveLectureEdit({ lectureUsers }));
  } catch (error) {
    yield put(rejectLectureEdit({ error }));
  }
};

export default function* getGroupsWatcher() {
  yield takeLatest(requestLectureEdit, editLecture);
}
