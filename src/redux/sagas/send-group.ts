import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import sendGroupAPI from '../../api/send-group';
import { receiveGroupSend, rejectCodeSend, requestGroupSend } from '../actions';

interface ISetUserAction {
  type: string;
  payload: any;
}

const sendGroup = function* sendGroup(action: ISetUserAction) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const response = yield call(sendGroupAPI, action.payload.userId, action.payload.groupId);
    yield put(receiveGroupSend({ groupTitle: response.title }));
  } catch (error) {
    yield put(rejectCodeSend({ error }));
  }
};

export default function* sendGroupWatcher() {
  yield takeLatest(requestGroupSend, sendGroup);
}
