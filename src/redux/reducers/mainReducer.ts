import { Action } from '../../utils/types/state-types';
import { SET_USER_RECEIVED } from '../actions';

const initialState = {
  user: null,
};

function mainReducer(state = initialState, action: Action) {
  const { type } = action;
  switch (type) {
    case SET_USER_RECEIVED: {
      const { payload } = action as Action<any>;
      return {
        ...state,
        user: payload.user,
      };
    }
    default:
      return state;
  }
}

export default mainReducer;
