const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');
const config = require('./config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html文件
const WebpackBar = require('webpackbar');

const { merge } = require('webpack-merge');

const isDev = process.env.NODE_ENV === 'development';
const CDN_HOST = '/';

const commonWebpackConfig = {
  target: 'web',
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: 'js/[name].[chunkhash:6].js',
    path: path.join(__dirname, '../dist'),
    publicPath: isDev ? '/' : CDN_HOST,
    clean: true,
  },
  plugins: [
    // new WebpackBar({
    //   name: pkg.name,
    //   color: '#f7b41e',
    // }),
    new webpack.ProvidePlugin({
      _conf: '_conf',
      _api: [path.join(__dirname, '../src/conf/api.js'), 'default'],
      _util: [path.join(__dirname, '../src/utils/common.js'), 'default'],
      _ajax: [path.join(__dirname, '../src/utils/ajax.js'), 'default'],
      _hook: [path.join(__dirname, '../src/hooks/index.js'), 'default'],
      _gb: [path.join(__dirname, '../src/conf/global.style.js'), 'default'],
      Icon: [path.join(__dirname, '../src/components/Icon.js'), 'default'],
      Msg: ['react-intl', 'FormattedMessage'],
      React: 'react',
      Svg: ['react-svg-inline', 'default'],
      Component: ['react', 'Component'],
      useSwr: ['swr', 'default'],
      useState: ['react', 'useState'],
      useEffect: ['react', 'useEffect'],
      useMemo: ['react', 'useMemo'],
      useDispatch: ['react-redux', 'useDispatch'],
      useSelector: ['react-redux', 'useSelector'],
      connect: ['react-redux', 'connect'],
      Link: ['react-router-dom', 'Link'],
      classnames: ['classnames/bind'],
      css: ['styled-components', 'default'],
    }),
    // 自动生成html文件，使用html-webpack-template插件指定模板
    new HtmlWebpackPlugin({
      title: pkg.config.appTitle,
      filename: `index.html`,
      favicon: path.join(__dirname, '../src/assets/images/favicon.ico'),
      template: path.join(__dirname, '../index.html'), // 使用html-webpack-template插件扩充默认模板
      inject: 'body', // 由html-webpack-template处理文件打包后文件引入，所以此处关闭默认html-webpack-plugin文件注入
      appMountId: config.appMountId, // 默认app容器id
      mobile: false, // 是否开启移动端支持，meta标签'
      links: [], // 额外links
      scripts: [], // 额外js
      meta: [
        // 指定meta标签
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
        },
      ],
      // base: '',
      minify: {
        // 设置代码压缩选项
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
      },
      templateParameters: {
        env: JSON.stringify({
          name: pkg.config.appName,
          network: isDev ? 'testnet' : 'mainnet',
          apiHost: '',
          version: pkg.version,
        }),
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
    alias: {
      ...config.alias,
      '@': path.join(__dirname, '../src'),
      _: path.join(__dirname, '../src/components'),
      '#': path.join(__dirname, '../src/assets/images'),
    },
  },
  externals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif|bmp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[hash].[ext]',
              outputPath: '../dist/images',
              publicPath: '/images',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      {
        test: /\.(eot|woff?|ttf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              outputPath: '../dist/fonts/',
              publicPath: '/fonts',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
};

module.exports = (envVars, { mode }) => {
  const env = mode === 'development' ? 'dev' : 'prod';
  const common = commonWebpackConfig;
  const envConfig = require(`./webpack.${env}.js`);
  return merge(common, envConfig);
};
