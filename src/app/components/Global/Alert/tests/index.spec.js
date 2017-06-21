/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Alert from '../index';

const props = {
  title: 'Alert Title',
  message: 'This is an alert',
  type: 'danger',
  show: true,
  dismissable: true
};

describe('Alert Component', () => {

  let component;

  beforeEach(() => {

    component = mount(
      <Alert {...props} />
    );

  });

  it('renders correctly', () => {

    const tree = renderer.create(
      <Alert {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();

  });

  it('displays title', () => {

    expect(component.find('.alert-title').text()).toEqual(props.title);

  });

  it('displays message', () => {

    const message = component.find('.alert-message').getDOMNode();

    expect(message.innerHTML).toEqual(props.message);

  });

  it('sets alert class', () => {

    if (props.type) {
      expect(component.find(`.alert-${props.type}`).length).toEqual(1);
    }

  });

  it('returns alert if show prop is set to true', () => {

    component = mount(
      <Alert {...props} show={true} />
    );

    expect(component.find('.alert').length).toEqual(1);

  });

  it('returns null if show prop is set to false', () => {

    component = mount(
      <Alert {...props} show={false} />
    );

    expect(component.find('.alert').length).toEqual(0);

  });

  it('displays close button if dismassable prop is set to true', () => {

    component = mount(
      <Alert {...props} dismissable={true} />
    );

    expect(component.find('button.close').length).toEqual(1);

  });

  it('returns null when dismissed', () => {

    component.instance().dismiss();

    expect(component.find('.alert').length).toEqual(0);

  });

});
