export const createAction = (type: string) => {
  const actionCreator = (payload?: unknown) => ({ type, payload });
  actionCreator.toString = () => type;
  return actionCreator;
};

export const SET_USER_REQUESTED = 'SET_USER_REQUESTED';
export const SET_USER_REJECTED = 'SET_USER_REJECTED';
export const SET_USER_RECEIVED = 'SET_USER_RECEIVED';

export const requestSetUser = createAction(SET_USER_REQUESTED);
export const receiveSetUser = createAction(SET_USER_RECEIVED);
export const rejectSetUser = createAction(SET_USER_REJECTED);
