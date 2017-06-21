/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import sinon from 'sinon';

import FlickrSearchForm from '../index';

const props = {
  onSearch: sinon.spy()
};

describe('FlickrSearchForm Component', () => {

  it('renders correctly', () => {

    const tree = renderer.create(
      <FlickrSearchForm {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();

  });

  it('disables button if input is empty', () => {

    const component = mount(
      <FlickrSearchForm {...props} />
    );

    component.setState({ query: '' });
    component.find('form').getDOMNode().reset();

    expect(component.find('button[type="submit"]').prop('disabled')).toEqual(true);

  });

  describe('handleSubmit()', () => {

    let component;
    let form;
    let input;

    beforeEach(() => {

      component = mount(
        <FlickrSearchForm {...props} />
      );

      component.setState({ query: 'some text' });

      form = component.find('form');
      input = component.find('input[type="search"]').getDOMNode();

    });

    it('calls onSearch function and resets form', () => {

      form.simulate('submit');

      expect(props.onSearch.calledOnce).toEqual(true);
      expect(input.value).toEqual('');

    });

  });

  describe('handleChange()', () => {

    let component;
    let input;

    beforeEach(() => {

      component = mount(
        <FlickrSearchForm {...props} />
      );

      component.setState({ query: 'some text' });

      input = component.find('input[type="search"]');

    });

    it('sets state to the value of input', () => {

      input.getDOMNode().value = 'more text';
      input.simulate('change');

      expect(component.state('query')).toEqual(input.getDOMNode().value);

    });

  });

});
