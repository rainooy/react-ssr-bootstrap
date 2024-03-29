const path = require('path');
const pkg = require('../package.json');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html文件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MiniCssFile = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const config = require('./config.js');

const isDev = process.env.NODE_ENV === 'development';
const isTestnet = process.env.TEST_NET === 'true';
const isMainnet = process.env.NETWORK === 'mainnet';
const isAnalyze = process.env.ANALYZE === 'true';

const CDN_HOST = '/';

const extract_css_loader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '/css/',
  },
};

const myPlugins = [
  // new WebpackBar({
  //   name: pkg.name,
  //   color: '#f7b41e',
  // }),

  // 清空打包文件生成目录，每次打包前执行一次
  new CleanWebpackPlugin(),
  // hot reload
  new ReactRefreshWebpackPlugin(),
  // 自动生成html文件，使用html-webpack-template插件指定模板
  new HtmlWebpackPlugin({
    title: pkg.config.appTitle,
    filename: `index.html`, 
    favicon: path.join(__dirname, '../src/assets/images/favicon.ico'),
    template: path.join(__dirname, '../index.html'), // 使用html-webpack-template插件扩充默认模板
    inject: true, // 由html-webpack-template处理文件打包后文件引入，所以此处关闭默认html-webpack-plugin文件注入
    appMountId: config.appMountId, // 默认app容器id
    mobile: false, // 是否开启移动端支持，meta标签
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
    // minify: {
    //   // 设置代码压缩选项
    //   collapseInlineTagWhitespace: true,
    //   collapseWhitespace: true,
    // },
    // window: {
    //   // 设置全局环境变量
    //   env: {
    //     name: pkg.config.appName,
    //     network: isMainnet ? 'mainnet' : isDev ? 'testnet' : 'mainnet',
    //     apiHost: isTestnet
    //       ? config.apiHostTestNet
    //       : isMainnet
    //       ? config.apiHostProd
    //       : isDev
    //       ? config.apiHostDev
    //       : config.apiHostProd,
    //     apiHostKit: config.apiHostKit,
    //     wsHost: isMainnet ? config.wsHostProd : isDev ? config.wsHostDev : config.wsHostProd,
    //     version: pkg.version,
    //   },
    // },
  }),
  // 单独打包css到独立文件
  new MiniCssExtractPlugin({
    filename: 'css/style_[name]_[contenthash:6].css',
  }),
  // new ProgressPlugin(),
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
  // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en/),
];

const AnalyzerPlugin = new BundleAnalyzerPlugin({
  analyzerPort: 2019,
});

isAnalyze && myPlugins.push(AnalyzerPlugin);
// isDev && myPlugins.push(new webpack.HotModuleReplacementPlugin());
// webpack config
module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'inline-source-map' : 'source-map',
  target: 'web',
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: 'js/[name].[chunkhash:6].js',
    path: path.join(__dirname, '../dist'),
    publicPath: isDev ? '/' : CDN_HOST,
  },
  plugins: myPlugins,
  optimization: {
    runtimeChunk: 'single',
    // moduleIds: 'hashed',
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '_',
      maxInitialRequests: 5,
      cacheGroups: {
        react: {
          test: /(react|redux|antd|rc-|ant|intl|swr|axios|styled)/,
          chunks: 'initial',
          name: 'common',
          priority: 10,
        },
        libs: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'libs',
          priority: -10,
        },
      },
    },
    // minimize: true,
    minimizer: [
      new MiniCssFile({}),
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          safari10: false,
          ie8: false,
          format: {
            comments: false,
          },
        },
      }),
    ],
    concatenateModules: true,
    noEmitOnErrors: true,
  },
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: 'babel-loader',
        exclude: [config.nodeModules],
      },
      {
        test: /\.css$/,
        use: [isDev ? 'style-loader' : extract_css_loader, 'css-loader', 'postcss-loader'],
        include: [config.nodeModules],
      },
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
  externals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
    alias: {
      ...config.alias,
      '@': path.join(__dirname, '../src'),
      _: path.join(__dirname, '../src/components'),
      '#': path.join(__dirname, '../src/assets/images'),
    },
  },
  devServer: {
    // contentBase: path.join(__dirname, '../dist'),
    port: pkg.config.port,
    host: '0.0.0.0',
    // https: true,
    hot: true,
    open: true,
    // useLocalIp: true,
    compress: false,
    // clientLogLevel: 'none',   // 可选值 none ，info ， warning ， error
    // publicPath: '/',
    historyApiFallback: true,
  },
};
