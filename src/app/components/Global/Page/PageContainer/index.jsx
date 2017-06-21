import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function PageContainer({ children, className, ...rest }) {

  return (
    <div className={`page-container ${className}`} {...rest}>
      {children}
    </div>
  );

}

PageContainer.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export default PageContainer;
