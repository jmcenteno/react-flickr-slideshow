import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import FlickrService from '../../../services/flickr';
import * as actions from '../actions';
import * as types from '../constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('AppContainer Actions', () => {

  describe('start()', () => {

    it('has a type of IMAGES_SEARCH_START', () => {

      expect(actions.start().type).toEqual(types.IMAGES_SEARCH_START);

    });

    it('clears existing data', () => {

      expect(actions.start().data).toEqual(null);

    });

  });

  describe('handleSuccess()', () => {

    const data = [];

    it('has type of IMAGES_SEARCH_SUCCESS', () => {

      expect(actions.handleSuccess(data).type).toEqual(types.IMAGES_SEARCH_SUCCESS);

    });

    it('returns collection of search results', () => {

      expect(actions.handleSuccess(data).data).toEqual(data);

    });

  });

  describe('handleError()', () => {

    const error = {};

    it('has type of IMAGES_SEARCH_ERROR', () => {

      expect(actions.handleError(error).type).toEqual(types.IMAGES_SEARCH_ERROR);

    });

    it('returns error object', () => {

      expect(actions.handleError(error).data).toEqual(error);

    });

  });

  describe('searchImages()', () => {

    afterEach(() => {
      fetchMock.restore();
    });

    it('dispatches actions on successful fetch request', () => {

      const store = mockStore({});

      const imagesMock = {
        stat: 'ok',
        photos: {
          photo: [
            {
              id: 0,
              title: 'Untitled',
              thumb: 'https://farmundefined.staticflickr.com/undefined/0_undefined_q.jpg',
              full: 'https://farmundefined.staticflickr.com/undefined/0_undefined_z.jpg'
            }
          ]
        }
      };

      const query = 'cats';

      fetchMock.get(`${FlickrService.baseUrl}&method=flickr.photos.search&text=${query}&safe_search=1`, imagesMock);

      return store.dispatch(actions.searchImages(query))
        .then(() => {

          expect(store.getActions()).toEqual([
            { type: types.IMAGES_SEARCH_START, data: null },
            { type: types.IMAGES_SEARCH_SUCCESS, data: imagesMock.photos.photo }
          ]);

        });

    });

  });

});
