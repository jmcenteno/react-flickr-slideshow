import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import FlickrNavControl from '../index';

describe('FlickrNavControl Component', () => {

  let component;

  const props = {
    direction: 'left',
    onClick: jest.fn()
  };

  beforeEach(() => {

    component = shallow(
      <FlickrNavControl {...props} />
    );

  });

  it('renders correctly', () => {

    const tree = renderer.create(
      <FlickrNavControl {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();

  });

  it('sets icon direction', () => {

    expect(component.hasClass(props.direction)).toEqual(true);
    expect(component.find(`.glyphicon-menu-${props.direction}`).length).toEqual(1);

  });

  it('call onClick event handler', () => {

    component.simulate('click');

    expect(props.onClick).toBeCalled();

  });

});
