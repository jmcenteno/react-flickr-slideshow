import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import FlickrCaption from '../index';

describe('FlickrCaption Component', () => {

  let component;

  const props = {
    title: 'Image Title'
  };

  beforeEach(() => {

    component = shallow(
      <FlickrCaption {...props} />
    );

  });

  it('renders correctly', () => {

    const tree = renderer.create(
      <FlickrCaption {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();

  });

  it('displays image title', () => {

    expect(component.find('.carousel-caption-title').text()).toEqual(props.title);

  });

});
