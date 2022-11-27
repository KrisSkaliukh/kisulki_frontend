import {
  put,
  takeLatest,
} from 'redux-saga/effects';
import wifiName from 'wifi-name';

import { receiveCodeSend, rejectCodeSend, requestCodeSend } from '../actions';

const sendCode = function* sendCode() {
  try {
    console.log(wifiName());
    yield wifiName().then((name: any) => {
      if (name !== 'sfedu'
      || name !== 'sfedu-conf'
      || name !== 'sfedu-stud'
      ) {
        throw Error('Вы должны быть подключены к wi-fi сети ЮФУ');
      }
    });
    yield put(receiveCodeSend());
  } catch (error) {
    yield put(rejectCodeSend({ error }));
  }
};

export default function* sendCodeWatcher() {
  yield takeLatest(requestCodeSend, sendCode);
}
