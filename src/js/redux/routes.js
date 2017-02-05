import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Application from 'js/app/Application';
import Public from 'js/app/Public'
import Home from 'js/app/Home'

export default (
  <Route component={ Application }>
    <Route component={ Public }>
      <Route path="/">
        <IndexRoute component={ Home } />
      </Route>
    </Route>
  </Route>
)
