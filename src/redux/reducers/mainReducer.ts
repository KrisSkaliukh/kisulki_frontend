import { Reducer } from 'react';

import { Action } from '../../utils/types/state-types';
import {
  CODE_SENT_RECEIVED,
  CODE_SENT_REJECTED,
  CODE_SENT_REQUESTED,
  GET_GROUPS_RECEIVED,
  GET_GROUPS_REJECTED,
  GET_GROUPS_REQUESTED,
  GET_SCHEDULE_RECEIVED,
  GET_SCHEDULE_REJECTED,
  GET_SCHEDULE_REQUESTED,
  LECTURE_EDIT_RECEIVED,
  SEND_REGITRATION_CODE_REJECTED,
  SET_USER_RECEIVED,
  USERS_RECEIVED,
  USERS_REJECTED,
  USERS_REQUESTED,
} from '../actions';

const initialState = {
  user: null,
  isLoading: false,
  error: '',
  lessons: [],
  groups: [],
  lectureUsers: [],
};

const mainReducer: Reducer<any, Action> = (state = initialState, action: Action) => {
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
    case SEND_REGITRATION_CODE_REJECTED: {
      const { payload } = action as Action<any>;
      return {
        ...state,
        error: payload.error,
      };
    }
    case CODE_SENT_REQUESTED: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CODE_SENT_RECEIVED: {
      return {
        ...state,
        isLoading: false,
        user: {
          ...(state.user ? {
            ...state.user,
            user: {
              ...state.user.user,
              isFirstLogin: false,
            },
          } : {}),
        },
      };
    }
    case CODE_SENT_REJECTED: {
      const { payload } = action as Action<any>;
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }
    case GET_GROUPS_REQUESTED: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_GROUPS_RECEIVED: {
      const { payload } = action as Action<any>;
      return {
        ...state,
        isLoading: false,
        groups: payload.groups,
      };
    }
    case GET_GROUPS_REJECTED: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case USERS_REQUESTED: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case USERS_RECEIVED: {
      const { payload } = action as Action<any>;
      return {
        ...state,
        isLoading: false,
        lectureUsers: payload.lectureUsers,
      };
    }
    case USERS_REJECTED: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case LECTURE_EDIT_RECEIVED: {
      const { payload } = action as Action<any>;
      return {
        ...state,
        lectureUsers: payload.lectureUsers,
      };
    }
    default:
      return state;
  }
};

export default mainReducer;
