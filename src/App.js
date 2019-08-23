import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { IntlProvider } from 'react-intl';
import zh_CN from './conf/locales/zh-CN';
import en_US from './conf/locales/en-US';

import Home from '@/pages/Home';
import Login from '@/pages/user/Login';
import Register from '@/pages/user/Register';

const mapStateToProps = (state) => ({
  config: state.config,
})
@connect(mapStateToProps, { })
class App extends PureComponent {

  constructor (props) {
    super(props);
    this.state = {
      lang: ''
    }
  }
  
  render() {
    const { config } = this.props;
    return (
      <IntlProvider
        locale={config.lang}
        messages={{zh: zh_CN, en: en_US}[config.lang]}
      >
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" render={() => <Login />} />
              <Route exact path="/register" render={() => <Register />} />
              <Route path="/" render={() => <Home />} />
              <Redirect to="/login" />
            </Switch>
          </BrowserRouter>
        </div>
      </IntlProvider>
    );
  }
}

export default hot(module)(App);
