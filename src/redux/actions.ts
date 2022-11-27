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

export const CODE_SENT_REQUESTED = 'CODE_SENT_REQUESTED';
export const CODE_SENT_RECEIVED = 'CODE_SENT_RECEIVED';
export const CODE_SENT_REJECTED = 'CODE_SENT_REJECTED';

export const GET_GROUPS_REQUESTED = 'GET_GROUPS_REQUESTED';
export const GET_GROUPS_RECEIVED = 'GET_GROUPS_RECEIVED';
export const GET_GROUPS_REJECTED = 'GET_GROUPS_REJECTED';

export const requestSetUser = createAction(SET_USER_REQUESTED);
export const receiveSetUser = createAction(SET_USER_RECEIVED);
export const rejectSetUser = createAction(SET_USER_REJECTED);
export const requestGetSchedule = createAction(GET_SCHEDULE_REQUESTED);
export const receiveGetSchedule = createAction(GET_SCHEDULE_RECEIVED);
export const rejectGetSchedule = createAction(GET_SCHEDULE_REJECTED);
export const requestCodeSend = createAction(SEND_REGITRATION_CODE_REQUESTED);
export const receiveCodeSend = createAction(SEND_REGITRATION_CODE_RECEIVED);
export const rejectCodeSend = createAction(SEND_REGITRATION_CODE_REJECTED);
export const requestGroupSend = createAction(CODE_SENT_REQUESTED);
export const receiveGroupSend = createAction(CODE_SENT_RECEIVED);
export const rejectGroupSend = createAction(CODE_SENT_REJECTED);
export const requestGetGroups = createAction(GET_GROUPS_REQUESTED);
export const receiveGetGroups = createAction(GET_GROUPS_RECEIVED);
export const rejectGetGroups = createAction(GET_GROUPS_REJECTED);
