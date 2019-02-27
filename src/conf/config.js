const api_base_url = window.env.apiHost;
const config = {
  path: {
    api_base_url,
    api_url: {
      
    },
    links: {},
  },
  default_lang: 'zh-cn',
  btm_asset_id: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
  coinbase_asset_id: '0000000000000000000000000000000000000000000000000000000000000000',
};

const get_path = (key) => {
  if (!key) throw new Error('key is required.');
  if (!config.path.api_url[key]) throw new Error('not found.');
  return config.path.api_base_url + config.path.api_url[key]
};

export default config;
export { config, get_path };