import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function FlickrCaption({ title }) {

  return (
    <div className='carousel-caption'>
      <h3 className='carousel-caption-title'>
        {title}
      </h3>
    </div>
  );

}

FlickrCaption.propTypes = {
  title: PropTypes.string
};

export default FlickrCaption;
