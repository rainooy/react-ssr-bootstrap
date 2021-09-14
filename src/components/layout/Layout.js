import Header from './Header';
import Footer from './Footer';
import { StyleWrapper, GlobalStyles } from './overwrite.style';
import { ThemeProvider } from 'styled-components';

import { Wrap } from './layout.style';
import theme from './theme.config.js';

const Layout = ({ children, style, hideLogo }) => {
  const _config = useSelector((state) => state.config);
  return (
    <ThemeProvider theme={theme[_config.theme]}>
      <StyleWrapper>
        <GlobalStyles />
        <Wrap style={style}>
          <Header hideLogo={hideLogo} />
          {children}
          <Footer />
        </Wrap>
      </StyleWrapper>
    </ThemeProvider>
  );
};

export default Layout;
