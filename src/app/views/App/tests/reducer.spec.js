import { fromJS } from 'immutable';

import reducer from '../reducer';
import * as types from '../constants';

describe('AppContainer Reducer', () => {

  it('returns initial state', () => {

    const initialState = {
      loading: false,
      error: null,
      images: null
    };

    expect(reducer(undefined, {})).toEqual(fromJS(initialState));

  });

  it('sets loading to true on IMAGES_SEARCH_START', () => {

    const action = { type: types.IMAGES_SEARCH_START };
    const newState = reducer().merge({
      loading: true,
      error: null,
      images: null
    });

    expect(reducer(undefined, action)).toEqual(fromJS(newState));

  });

  it('sets loading status and search results on IMAGES_SEARCH_SUCCESS', () => {

    const data = [
      { id: 1, thumb: '', full: '' },
      { id: 2, thumb: '', full: '' }
    ];

    const action = {
      type: types.IMAGES_SEARCH_SUCCESS,
      data
    };

    const newState = reducer().merge({
      loading: false,
      error: null,
      images: data
    });

    expect(reducer(undefined, action)).toEqual(fromJS(newState));

  });

  it('sets loading status and error on IMAGES_SEARCH_ERROR', () => {

    const data = { message: 'error' };

    const action = {
      type: types.IMAGES_SEARCH_ERROR,
      data
    };

    const newState = reducer().merge({
      loading: false,
      error: data,
      images: null
    });

    expect(reducer(undefined, action)).toEqual(fromJS(newState));

  });

});
