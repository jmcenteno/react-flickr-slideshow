import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Spinner from '../index';

describe('Spinner Component', () => {

  let component;

  const props = {
    src: './custom-spinner.gif',
    text: 'Please wait',
    className: 'myClassName'
  };

  beforeEach(() => {

    component = shallow(
      <Spinner className={props.className} />
    );

  });

  it('renders correctly', () => {

    const tree = renderer.create(
      <Spinner {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();

  });

  it('should display \'../assets/img/spinner.svg\' as default image', () => {

    expect(component.find('img').node.props.src).toEqual('../assets/img/spinner.svg');

  });

  it('should display custom image when src prop is provided', () => {

    component = shallow(
      <Spinner src={props.src} />
    );

    expect(component.find('img').node.props.src).toEqual(props.src);

  });

  it('should set image alt attribute to the value of text prop', () => {

    component = shallow(
      <Spinner text={props.text} />
    );

    expect(component.find('img').node.props.alt).toEqual(props.text);

  });

  it('should display \'Loading\' as default text', () => {

    expect(component.find('img').node.props.src).toEqual('../assets/img/spinner.svg');

  });

  it('should display value of text prop when provided', () => {

    component = shallow(
      <Spinner text={props.text} />
    );

    expect(component.find('.spinner-text').text()).toEqual(props.text);

  });

  it('should set className on root element', () => {

    expect(component.hasClass(props.className)).toEqual(true);

  });

});
