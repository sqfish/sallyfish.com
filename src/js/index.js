import 'babel-polyfill';
require('font-awesome/css/font-awesome.css');
require('src/index.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import ReduxContainer from 'js/redux';

class SallyFishApp {
  constructor() {
    this.renderApp = this.renderApp.bind(this);
    this.rootElement = null;
  }

  renderApp() {
    this.rootElement = document.getElementById('sally-fish-app');
    ReactDOM.render(
      <ReduxContainer />,
      this.rootElement
    );
  }
}

window.app = new SallyFishApp();
window.app.renderApp();
