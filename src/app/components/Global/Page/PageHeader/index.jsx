import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function PageHeader({ title, subtitle, className, ...rest }) {

  return (
    <header className={`page-header ${className}`} {...rest}>
      <h1>
        <span className='page-title'>{title}</span>
        {
          subtitle ?
            <small className='page-subtitle'>{subtitle}</small> :
            null
        }
      </h1>
    </header>
  );

}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string
};

PageHeader.defaultProps = {
  className: ''
};

export default PageHeader;
