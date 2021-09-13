import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import zh_CN from './conf/locales/zh';
import en_US from './conf/locales/en';

import Home from '@/pages/home/home';

const App = () => {
  const config = useSelector((state) => state.config);
  return (
    <IntlProvider locale={config.lang} messages={{ zh: zh_CN, en: en_US }[config.lang]}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Redirect to={'/'} />
        </Switch>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default hot(App);
