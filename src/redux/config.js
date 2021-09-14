// types
const UPDATE = 'config/UPDATE';
const LOCALLANGKEY = 'LOCALLANGKEY';
const os_lang =
  localStorage.getItem(LOCALLANGKEY) || (navigator.language || navigator.userLanguage || 'en').substr(0, 2);
const user_lang = os_lang === 'zh' ? 'zh' : 'en';
const initState = {
  isloading: false,
  lang: user_lang,
  theme: 'light',
};
// reducers
const reducers = {
  config(state = initState, action = {}) {
    switch (action.type) {
      case UPDATE:
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  },
};

// action creators
const actions = {
  update: (lang) => (dispatch) => {
    localStorage.setItem(LOCALLANGKEY, lang);
    dispatch({
      type: UPDATE,
      payload: lang,
    });
  },
};

export default reducers;
export { actions };
