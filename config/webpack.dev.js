const pkg = require('../package.json');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const config = require('./config.js');

const isTestnet = process.env.TEST_NET === 'true';
const isMainnet = process.env.NETWORK === 'mainnet';
const isAnalyze = process.env.ANALYZE === 'true';


const AnalyzerPlugin = new BundleAnalyzerPlugin({
  analyzerPort: 2019,
});

isAnalyze && myPlugins.push(AnalyzerPlugin);
// isDev && myPlugins.push(new webpack.HotModuleReplacementPlugin());
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
            }
          }
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
