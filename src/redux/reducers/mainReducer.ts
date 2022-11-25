import { Action } from '../../utils/types/state-types';

const initialState = {};

function mainReducer(state = initialState, action: Action) {
  const { type } = action;
  switch (type) {
    default:
      return state;
  }
}

export default mainReducer;
