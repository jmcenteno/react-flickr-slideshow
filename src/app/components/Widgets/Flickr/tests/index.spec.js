/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import _ from 'lodash';

import FlickrWidget from '../index';
import Spinner from '../../../Global/Spinner';
import FlickrSearchForm from '../SearchForm';
import FlickrThumbnails from '../Thumbnails';
import FlickrNavControl from '../NavControl';

const props = {
  images: _.times(4).map((item, i) => {
    return {
      id: i.toString(),
      title: `Image ${i}`,
      thumb: `http://example.com/${i}`,
      full: `http://example.com/${i}`
    };
  }),
  onSearch: sinon.spy(),
  loading: false,
  className: 'myClassName',
  itemsPerPage: 4
};

describe('FlickrWidget Component', () => {

  let component;

  beforeEach(() => {

    component = mount(
      <FlickrWidget {...props} />
    );

  });

  it('renders correctly', () => {

    const tree = renderer.create(
      <FlickrWidget {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();

  });

  it('displays search form', () => {

    expect(component.find(FlickrSearchForm).length).toEqual(1);

  });

  it('displays 2 navigation controls', () => {

    expect(component.find(FlickrNavControl).length).toEqual(2);

  });

  it('displays thumbnails', () => {

    expect(component.find(FlickrThumbnails).length).toEqual(1);

  });

  it('displays spinner when loading', () => {

    component = shallow(
      <FlickrWidget {...props} loading={true} />
    );

    expect(component.find(Spinner).length).toEqual(1);

  });

  describe('next()', () => {

    beforeEach(() => {

      component = mount(
        <FlickrWidget {...props} />
      );

    });

    it('should display next slide', () => {

      component.setState({ thumbnails: props.images.slice(0, 4) });
      component.find('.carousel-control.right').simulate('click');

      const currentSlideIndex = component.state('currentSlideIndex');

      expect(component.find('.item.active').getDOMNode().style.backgroundImage).toContain(props.images[currentSlideIndex].thumb);

    });

  });

  describe('previous()', () => {

    beforeEach(() => {

      component = mount(
        <FlickrWidget {...props} />
      );

    });

    it('should display previous slide', () => {

      component.setState({ currentSlideIndex: 1, thumbnails: props.images.slice(0, 4) });
      component.find('.carousel-control.left').simulate('click');

      const currentSlideIndex = component.state('currentSlideIndex');

      expect(component.find('.item.active').getDOMNode().style.backgroundImage).toContain(props.images[currentSlideIndex].thumb);

    });

  });

  describe('setCurrentSlide()', () => {

    beforeEach(() => {

      component = mount(
        <FlickrWidget {...props} />
      );

    });

    it('should set the current slide', () => {

      const id = props.images[1].id.toString();

      component.instance().setCurrentSlide(id);

      expect(component.state('currentSlideIndex').toString()).toEqual(id);

    });

  });

  describe('onSearch()', () => {

    beforeEach(() => {

      component = mount(
        <FlickrWidget {...props} />
      );

    });

    it('calls onSearch function and resets the state', () => {

      component.find(FlickrSearchForm).find('form').simulate('submit');

      expect(props.onSearch.calledOnce).toEqual(true);
      expect(component.state('thumbnails').length).toEqual(0);
      expect(component.state('currentSlideIndex')).toEqual(0);

    });

  });

});
