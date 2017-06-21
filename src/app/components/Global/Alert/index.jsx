import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Alert extends Component {

  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]).isRequired,
    type: PropTypes.oneOf(['danger', 'success', 'info']),
    dismissable: PropTypes.bool,
    show: PropTypes.bool
  }

  static defaultProps = {
    show: true,
    dismissable: false
  }

  constructor(props) {

    super(props);

    this.state = {
      show: this.props.show
    };

    this.setState = this.setState.bind(this);
    this.dismiss = this.dismiss.bind(this);

  }

  dismiss() {

    this.setState({ show: false });

  }

  render() {

    const { type, title, message, dismissable } = this.props;
    const className = [
      'alert',
      !type ? '' : `alert-${type}`,
      dismissable ? 'alert-dismissable' : ''
    ];

    return (
      this.state.show ?
        <div className={className.join(' ')} role='alert'>
          {
            dismissable ?
              <button
                type='button'
                className='close'
                data-dismiss='alert'
                aria-label='Close'
                onClick={ this.dismiss }>
                <span aria-hidden='true'>&times;</span>
              </button> :
              null
          }
          {
            title ?
              <h4 className='alert-title'>{title}</h4> :
              null
          }
          <div className='alert-message'>
            {message}
          </div>
        </div> :
        null
    );

  }

}
