import api from './api';
const config = {
  path: {},
  default_lang: 'zh-cn',
};

const get_path = (key) => {
  if (!key) throw new Error('key is required.');
  if (!config.path.api_url[key]) throw new Error('not found.');
  return config.path.api_base_url + config.path.api_url[key];
};

export default config;
export { config, get_path };
