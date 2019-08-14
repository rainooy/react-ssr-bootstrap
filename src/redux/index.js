import { combineReducers } from 'redux';
import block from './block';
import config from './config';




export default combineReducers({
  ...block,
  ...config,
});
