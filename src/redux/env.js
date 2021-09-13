// types
const SET_ENV = 'env/SET_ENV';
// reducers
const defaultEnv = {};
const reducers = {
  env(state = defaultEnv, action = {}) {
    switch (action.type) {
      case SET_ENV:
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
  setEnv: (obj) => (dispatch) => {
    dispatch({
      type: SET_ENV,
      payload: obj,
    });
  },
  connectToByone: () => async (dispatch) => {},
};

export default reducers;
export { actions };
