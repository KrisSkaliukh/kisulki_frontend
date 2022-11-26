import { Action } from '../../utils/types/state-types';
import {
  GET_SCHEDULE_RECEIVED,
  GET_SCHEDULE_REJECTED,
  GET_SCHEDULE_REQUESTED,
  SET_USER_RECEIVED,
} from '../actions';

const initialState = {
  user: null,
  isLoading: false,
  error: '',
  lessons: [],
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
    case GET_SCHEDULE_REQUESTED: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_SCHEDULE_RECEIVED: {
      const { payload } = action as Action<any>;
      return {
        ...state,
        lessons: payload.lessons,
        isLoading: false,
        error: '',
      };
    }
    case GET_SCHEDULE_REJECTED: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export default mainReducer;
