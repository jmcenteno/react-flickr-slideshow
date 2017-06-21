import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import PageHeader from '../index';

describe('PageHeader Component', () => {

  let component;
  const props = {
    title: 'Page Title',
    subtitle: 'Page Subtitle',
    className: 'myClassName'
  };

  beforeEach(() => {

    component = shallow(
      <PageHeader {...props} />
    );

  });

  it('renders correctly', () => {

    const tree = renderer.create(
      <PageHeader {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();

  });

  it('renders value of title prop', () => {

    expect(component.find('.page-title').text()).toEqual(props.title);

  });

  it('renders value of subtitle prop', () => {

    expect(component.find('.page-subtitle').text()).toEqual(props.subtitle);

  });

  it('sets className on root element', () => {

    expect(component.hasClass(props.className)).toEqual(true);

  });

});
