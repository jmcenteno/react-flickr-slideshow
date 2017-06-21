import Flickr from '../../services/flickr';
import * as types from './constants';

export function start() {
  return {
    type: types.IMAGES_SEARCH_START,
    data: null
  };
}

export function handleSuccess(data) {
  return {
    type: types.IMAGES_SEARCH_SUCCESS,
    data
  };
}

export function handleError(error) {
  return {
    type: types.IMAGES_SEARCH_ERROR,
    data: error
  };
}

export function searchImages(input) {
  return function (dispatch) {

    dispatch(start());

    return Flickr.searchPhotos(input)
      .then(data => dispatch(handleSuccess(data)))
      .catch(error => dispatch(handleError(error)));

  };
}
