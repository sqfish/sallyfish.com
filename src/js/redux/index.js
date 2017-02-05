import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from 'js/redux/store';
import routes from 'js/redux/routes';

export const store = configureStore();

class ReduxContainer extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'ReduxContainer';
    this.state = {};
  }

  render() {
    return (
      <Provider store={ store }>
        <Router routes={ routes } history={ browserHistory } />
      </Provider>
    )
  }
}

export default ReduxContainer
