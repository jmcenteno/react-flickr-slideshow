import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Spinner = ({ src, text, className, ...rest }) => {

  const component = (
    <div className={ `spinner ${ className }` }>
      <div>
        <img src={ src } alt={ !text ? 'Loading' : text } />
        {
          text ?
            <div className='spinner-text'>{ text }</div> :
            null
        }
      </div>
    </div>
  );

  return React.cloneElement(component, rest);

};

Spinner.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  text: PropTypes.string
};

Spinner.defaultProps = {
  src: '../assets/img/spinner.svg'
};

export default Spinner;
