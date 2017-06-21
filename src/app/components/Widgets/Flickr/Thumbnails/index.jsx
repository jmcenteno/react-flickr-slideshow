import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './styles.scss';

function FlickrThumbnails({ images, currentSlide, setCurrentSlide, itemsPerPage }) {

  return (
    <div className='flickr-thumbnails'>
      <div className='flickr-thumbnails-slides'>
        {
          images.length ?
            images.map(item => {
              return (
                <a
                  key={`image-${item.id}`}
                  title={item.title}
                  className={`slide ${ currentSlide.id === item.id ? 'active' : '' }`}
                  onClick={ () => setCurrentSlide(item.id) }
                  style={{ width: `${(100 / itemsPerPage)}%` }}>
                  <div style={{ backgroundImage: `url('${item.thumb}')` }} />
                </a>
              );
            }) :
            null
        }
      </div>
    </div>
  );

}

const imgProps = {
  id: PropTypes.string,
  title: PropTypes.string,
  thumb: PropTypes.string,
  full: PropTypes.string
};

FlickrThumbnails.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape(imgProps)).isRequired,
  setCurrentSlide: PropTypes.func.isRequired,
  currentSlide: PropTypes.shape(imgProps).isRequired,
  itemsPerPage: PropTypes.oneOf(_.times(12).map(i => (i + 1)))
};

export default FlickrThumbnails;
