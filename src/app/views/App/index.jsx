import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchImages } from './actions';
import * as Page from '../../components/Global/Page';
import Alert from '../../components/Global/Alert';
import FlickrWidget from '../../components/Widgets/Flickr';

import './styles.scss';

export class App extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    images: PropTypes.object,
    error: PropTypes.object,
    actions: PropTypes.object
  }

  render() {

    const { images, loading, error, actions } = this.props;

    return (
      <Page.PageContainer className='app'>
        <div className='content'>

          <Page.PageHeader
            title='Flickr Search'
            subtitle='A React component for searching images on Flickr'
          />

          <FlickrWidget
            images={ images && images.size ? images.toJS() : [] }
            itemsPerPage={ 4 }
            loading={ loading }
            onSearch={ actions.search }
          />

          {
            error ?
              <Alert type='danger' dismissable={true} title='Error' message='Oops! Something went wrong.' /> :
              null
          }

        </div>
      </Page.PageContainer>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    loading: state.app.get('loading'),
    images: state.app.get('images'),
    error: state.app.get('error')
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    actions: {
      search: bindActionCreators(searchImages, dispatch)
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(App);

