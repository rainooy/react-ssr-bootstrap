import { withRouter } from 'react-router-dom';

import { actions as configActions } from '@/redux/config';

const Wrap = css.div`
  
`;

const Lang = () => {
  const dispatch = useDispatch();
  const _conf = useSelector((state) => state.config);
  const handleLangChange = (lang) => {
    dispatch(configActions.switchLang(lang));
    window.zE && window.zE('webWidget', 'setLocale', lang === 'en' ? 'en' : 'zh-cn');
  };
  return (
    <span onClick={() => handleLangChange(_conf.lang === 'zh' ? 'en' : 'zh')}>
      {_conf.lang === 'zh' ? 'En' : '中文'}
    </span>
  );
};

function Header({ hideLogo }) {
  return (
    <Wrap>
      <div className="cont">{!hideLogo && <Link to={'/'} className="logo"></Link>}</div>
    </Wrap>
  );
}

export default withRouter(Header);
