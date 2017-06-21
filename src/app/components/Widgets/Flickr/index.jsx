import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Spinner from '../../Global/Spinner';
import SearchForm from './SearchForm';
import Thumbnails from './Thumbnails';
import Caption from './Caption';
import NavControl from './NavControl';

import './styles.scss';

export default class FlickrWidget extends Component {

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSearch: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    className: PropTypes.string,
    itemsPerPage: PropTypes.oneOf(_.times(12).map(i => (i + 1)))
  }

  static defaultProps = {
    loading: false,
    className: '',
    itemsPerPage: 4
  }

  constructor() {

    super();

    this.state = {
      currentSlideIndex: 0,
      thumbnails: []
    };

    this.setState = this.setState.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.setCurrentSlide = this.setCurrentSlide.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);

  }

  onSearch(query) {

    this.props.onSearch(query);

    this.setState({
      currentSlideIndex: 0,
      thumbnails: []
    });

  }

  setCurrentSlide(id) {

    const { images } = this.props;
    const index = images.findIndex(item => item.id === id);

    this.setState({ currentSlideIndex: index === -1 ? 0 : index });

  }

  next() {

    let { currentSlideIndex, thumbnails } = this.state;
    const { images, itemsPerPage } = this.props;

    currentSlideIndex += 1;

    if (currentSlideIndex < images.length) {

      if (currentSlideIndex >= itemsPerPage && currentSlideIndex % itemsPerPage === 0) {
        thumbnails = images.slice(currentSlideIndex, currentSlideIndex + itemsPerPage);
      }

      this.setState({ currentSlideIndex, thumbnails });

    } else {

      this.setState({
        currentSlideIndex: 0,
        thumbnails: images.slice(0, itemsPerPage)
      });

    }

  }

  previous() {

    let { currentSlideIndex, thumbnails } = this.state;
    const { images, itemsPerPage } = this.props;

    if (currentSlideIndex > 0) {

      if (currentSlideIndex >= itemsPerPage && currentSlideIndex % itemsPerPage === 0) {
        thumbnails = images.slice(currentSlideIndex - itemsPerPage, currentSlideIndex);
      }

      currentSlideIndex -= 1;

      this.setState({ currentSlideIndex, thumbnails });

    } else {

      this.setState({
        currentSlideIndex: (images.length - 1),
        thumbnails: images.slice(images.length - itemsPerPage, images.length)
      });

    }

  }

  render() {

    const { images, loading, className, itemsPerPage } = this.props;
    const { currentSlideIndex, thumbnails } = this.state;

    return (
      <div className={ `flickr-widget ${className}` }>
        <SearchForm onSearch={ this.onSearch } />
        {
          !loading ?
            <div className='slides-container'>
              {
                images.length ?
                  <div>
                    <div className='carousel'>
                      <div className='carousel-inner'>
                        <div className='item active' style={{ backgroundImage: `url('${images[currentSlideIndex].full}')` }}>
                          <Caption title={images[currentSlideIndex].title} />
                        </div>
                        <NavControl direction='left' onClick={ this.previous } />
                        <NavControl direction='right' onClick={ this.next } />
                      </div>
                    </div>
                    <Thumbnails
                      images={ !thumbnails.length ? images.slice(0, itemsPerPage) : thumbnails }
                      currentSlide={ images[currentSlideIndex] }
                      setCurrentSlide={ this.setCurrentSlide }
                      itemsPerPage={ itemsPerPage }
                    />
                  </div> :
                  null
              }
            </div> :
            <Spinner text='Please wait...' />
        }
      </div>
    );

  }

}
