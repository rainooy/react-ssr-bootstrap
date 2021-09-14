const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MiniCssFile = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = require('./config.js');


const extract_css_loader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '/css/',
  },
};

module.exports = {
  mode: 'production',
  // devtool: 'source-map',
  plugins: [
    // 单独打包css到独立文件
    new MiniCssExtractPlugin({
      filename: 'css/style_[name]_[contenthash:6].css',
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
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
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: 'babel-loader',
        exclude: [config.nodeModules],
      },
      {
        test: /\.css$/,
        use: [extract_css_loader, 'css-loader', 'postcss-loader'],
        include: [config.nodeModules],
      },
    ]
  }
};