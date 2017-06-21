import { Map } from 'immutable';

import {
  IMAGES_SEARCH_START,
  IMAGES_SEARCH_ERROR,
  IMAGES_SEARCH_SUCCESS
} from './constants';

const initialState = Map({
  loading: false,
  error: null,
  images: null
});

const actionsMap = {

  [IMAGES_SEARCH_START]: (state) => {
    return state.merge({
      loading: true,
      error: null,
      images: null
    });
  },

  [IMAGES_SEARCH_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: action.data,
      images: null
    });
  },

  [IMAGES_SEARCH_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      error: null,
      images: action.data
    });
  }

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
