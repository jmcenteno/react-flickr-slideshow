import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AppContainer, { App } from '../index';
import * as Actions from '../actions';
import reducers from '../../../reducers';
import * as Page from '../../../components/Global/Page';
import FlickrWidget from '../../../components/Widgets/Flickr';

describe('AppContainer Component', () => {

  let store;

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  beforeEach(() => {

    store = mockStore(reducers());

  });

  it('renders correctly', () => {

    const tree = renderer.create(
      <AppContainer store={store} />
    ).toJSON();

    expect(tree).toMatchSnapshot();

  });

});

describe('App Component', () => {

  let component;
  const props = {
    images: null,
    loading: false,
    error: null,
    actions: {
      search: Actions.searchImages
    }
  };

  beforeEach(() => {

    component = shallow(
      <App {...props} />
    );

  });

  it('renders <PageContainer /> component', () => {

    expect(component.find(Page.PageContainer).length).toEqual(1);

  });

  it('renders <Page.Header /> component', () => {

    expect(component.find(Page.PageHeader).length).toEqual(1);

  });

  it('renders <FlickrWidget /> component', () => {

    expect(component.find(FlickrWidget).length).toEqual(1);

  });

});
