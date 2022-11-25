import { all } from 'redux-saga/effects';

import setUserWatcher from './set-user-saga';

export default function* rootSaga() {
  yield all([
    setUserWatcher(),
  ]);
}
