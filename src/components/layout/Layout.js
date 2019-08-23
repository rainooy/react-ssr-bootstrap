import BasicLayout from '@ant-design/pro-layout';
import Footer from './Footer.js';
import routes from '@/conf/routes';
import { Switch, Route } from 'react-router-dom';

import img_logo from '#/logo.png';

const Layout = ({ children }) => {
  // 菜单项渲染
  const menuItemRender = (menuItemProps, defaultDom) => {
    if (menuItemProps.isUrl) {
      return defaultDom;
    }
    return <Link to={menuItemProps.path}>{defaultDom}</Link>;
  };
  // 内容渲染
  const rightContentRender = rightProps => {
    return <div {...rightProps}></div>;
  }

  const renderRoutes = (routes) => {
    return (
      <Switch>
        {
          routes.map(item => (
            <Route key={item.path} path={item.path} component={item.component} />
          ))
        }
      </Switch>
    )
  }

  return (
    <BasicLayout
      title="Bystack"
      logo={img_logo}
      // route={routes}
      menuDataRender={() => routes}
      footerRender={() => <Footer />}
      menuItemRender={menuItemRender}
      // rightContentRender={rightContentRender}
    >
      {renderRoutes(routes)}
    </BasicLayout>
  );
};

export default Layout;
