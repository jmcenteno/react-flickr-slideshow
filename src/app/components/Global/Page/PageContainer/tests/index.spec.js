import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import PageContainer from '../index';

describe('PageContainer Component', () => {

  let component;

  const props = {
    className: 'myClassName'
  };

  beforeEach(() => {

    component = shallow(
      <PageContainer {...props} />
    );

  });

  it('renders correctly', () => {

    const tree = renderer.create(
      <PageContainer />
    ).toJSON();

    expect(tree).toMatchSnapshot();

  });

  it('sets className prop on root', () => {

    expect(component.hasClass(props.className)).toEqual(true);

  });

});
