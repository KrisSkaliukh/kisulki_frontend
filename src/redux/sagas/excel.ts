import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import getGroupAPI from '../../api/get-groups';
import { receiveExcel, rejectExcel, requestExcel } from '../actions';

const excel = function* excel() {
  try {
    yield call(getGroupAPI);
    yield put(receiveExcel());
  } catch (error) {
    yield put(rejectExcel({ error }));
  }
};

export default function* excelWatcher() {
  yield takeLatest(requestExcel, excel);
}
