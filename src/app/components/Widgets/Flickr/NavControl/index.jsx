import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function FlickrNavControl({ direction, onClick }) {

  return (
    <a className={`carousel-control ${direction}`} onClick={onClick}>
      <i className={`glyphicon glyphicon-menu-${direction}`} />
    </a>
  );

}

FlickrNavControl.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  onClick: PropTypes.func.isRequired
};

export default FlickrNavControl;
