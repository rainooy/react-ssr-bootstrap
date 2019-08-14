import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Home from './views/Home';
import About from './views/About'

function name(params) {
  window.getElementById('he')
  alert('he');
}

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Redirect to="/home" />
    </Switch>
  </BrowserRouter>
);

export default hot(module)(App);
