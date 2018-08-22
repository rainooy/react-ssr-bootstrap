import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Home from './views/Home';
import About from './views/About';

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
