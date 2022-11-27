export const createAction = (type: string) => {
  const actionCreator = (payload?: unknown) => ({ type, payload });
  actionCreator.toString = () => type;
  return actionCreator;
};

export const SET_USER_REQUESTED = 'SET_USER_REQUESTED';
export const SET_USER_REJECTED = 'SET_USER_REJECTED';
export const SET_USER_RECEIVED = 'SET_USER_RECEIVED';

export const GET_SCHEDULE_REQUESTED = 'GET_SCHEDULE_REQUESTED';
export const GET_SCHEDULE_REJECTED = 'GET_SCHEDULE_REJECTED';
export const GET_SCHEDULE_RECEIVED = 'GET_SCHEDULE_RECEIVED';

export const SEND_REGITRATION_CODE_REQUESTED = 'SEND_REGITRATION_CODE_REQUESTED';
export const SEND_REGITRATION_CODE_REJECTED = 'SEND_REGITRATION_CODE_REJECTED';
export const SEND_REGITRATION_CODE_RECEIVED = 'SEND_REGITRATION_CODE_RECEIVED';

export const requestSetUser = createAction(SET_USER_REQUESTED);
export const receiveSetUser = createAction(SET_USER_RECEIVED);
export const rejectSetUser = createAction(SET_USER_REJECTED);
export const requestGetSchedule = createAction(GET_SCHEDULE_REQUESTED);
export const receiveGetSchedule = createAction(GET_SCHEDULE_RECEIVED);
export const rejectGetSchedule = createAction(GET_SCHEDULE_REJECTED);
export const requestCodeSend = createAction(SEND_REGITRATION_CODE_REQUESTED);
export const receiveCodeSend = createAction(SEND_REGITRATION_CODE_RECEIVED);
export const rejectCodeSend = createAction(SEND_REGITRATION_CODE_REJECTED);
