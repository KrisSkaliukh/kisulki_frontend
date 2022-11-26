/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import AuthAPI from '../../api/auth';
import { receiveSetUser, rejectSetUser, requestSetUser } from '../actions';

interface ISetUserAction {
  type: string;
  payload: any;
}

const setUser = function* setUser(action: ISetUserAction) {
  try {
    // @ts-ignore
    const user: any = yield call(AuthAPI, {
      id: action.payload.id,
      firstName: action.payload.givenName,
      lastName: action.payload.surname,
      jobTitle: action.payload.jobTitle,
      token: action.payload.accessToken,
      displayName: action.payload.displayName,
    });
    yield put(receiveSetUser({
      user: {
        ...user,
        displayName: action.payload.displayName,
      },
    }));
  } catch (error) {
    console.log(error);
    yield put(rejectSetUser({ error }));
  }
};

export default function* setUserWatcher() {
  yield takeLatest(requestSetUser, setUser);
}
