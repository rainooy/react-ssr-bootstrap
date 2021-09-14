const pkg = require('../package.json');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const config = require('./config.js');

// webpack config
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    // hot reload
    new ReactRefreshWebpackPlugin(),
    // new ProgressPlugin(),
    // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en/),
  ],

  stats: 'errors-only',

  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [require('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
        exclude: [config.nodeModules],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        include: [config.nodeModules],
      },
    ],
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
