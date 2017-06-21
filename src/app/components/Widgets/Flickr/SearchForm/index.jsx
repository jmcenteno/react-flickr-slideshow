import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export default class FlickrSearchForm extends Component {

  static propTypes = {
    onSearch: PropTypes.func.isRequired
  };

  constructor() {

    super();

    this.state = {
      query: 'kittens'
    };

    this.setState = this.setState.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleOnChange(event) {

    this.setState({ query: event.target.value });

  }

  handleSubmit(e) {

    e.preventDefault();

    const { onSearch } = this.props;
    const { query } = this.state;

    if (query !== '') {
      onSearch(query);
      this.setState({ query: '' });
      this.form.reset();
    }

  }

  render() {

    const { query } = this.state;

    return (
      <div className='flickr-search-form center-block'>
        <form
          ref={ (el) => this.form = el }
          noValidate={ true }
          onSubmit={ this.handleSubmit }>
          <div className='input-group'>
            <input
              type='search'
              placeholder='Enter search criteria'
              defaultValue={ query }
              onChange={ this.handleOnChange }
              className='form-control'
              aria-label='Enter search criteria'
            />
            <span className='input-group-btn'>
              <button
                type='submit'
                disabled={ query === '' }
                className='btn btn-primary'
                aria-label='Submit'>
                <i className='glyphicon glyphicon-search' />
              </button>
            </span>
          </div>
        </form>
      </div>
    );

  }

}
