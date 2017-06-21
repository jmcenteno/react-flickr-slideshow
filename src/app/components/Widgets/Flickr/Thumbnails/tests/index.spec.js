import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import _ from 'lodash';

import FlickrThumbnails from '../index';

describe('FlickrThumbnails Component', () => {

  let component;

  const props = {
    images: _.times(4).map((item, i) => {
      return {
        id: i.toString(),
        title: `Image ${i}`,
        thumb: `http://example.com/${i}`,
        full: `http://example.com/${i}`
      };
    }),
    setCurrentSlide: jest.fn(),
    itemsPerPage: 4
  };

  props.currentSlide = props.images[0];

  beforeEach(() => {

    component = shallow(
      <FlickrThumbnails {...props} />
    );

  });

  it('renders correctly', () => {

    const tree = renderer.create(
      <FlickrThumbnails {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();

  });

  it('displays images with title attributes', () => {

    const elements = component.find('.slide');

    expect(elements.length).toEqual(props.images.length);

    elements.forEach((item, i) => {
      expect(item.find('> div').props().style.backgroundImage).toContain(props.images[i].thumb);
      expect(item.props().title).toEqual(props.images[i].title);
    });

  });

  it('sets \'active\' class on the image that matches the currentSlide id', () => {

    const index = _.findIndex(props.images, (item) => item.id === props.currentSlide.id);

    expect(component.find('.slide').at(index).props().className).toContain('active');

  });

  it('sets the same width on each slide', () => {

    component.find('.slide').nodes.forEach(item => {
      expect(item.props.style.width).toEqual(`${ 100 / props.itemsPerPage }%`);
    });

  });

  it('calls setCurrentSlide function when a slide is clicked', () => {

    const slide = component.find('.slide').at(2);

    slide.simulate('click');

    expect(props.setCurrentSlide).toBeCalled();

  });

});
