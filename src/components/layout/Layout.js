import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import { StyleWrapper, GlobalStyles } from './overwrite.style';
import { Wrap } from './layout.style';

const Layout = ({ children, style, hideLogo }) => {
  return (
    <StyleWrapper>
      <GlobalStyles />
      <Wrap style={style}>
        <Header hideLogo={hideLogo} />
        {children}
        <Footer />
      </Wrap>
    </StyleWrapper>
  );
};

export default Layout;
