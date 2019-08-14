const path = require('path');
const pkg = require('../package.json');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');      // 生成html文件
const HtmlWebpackTemplate = require('html-webpack-template');
const WebpackMonitor = require('webpack-monitor');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');

const config = require('./config.js');

const isDev = process.env.NODE_ENV === 'development';
const isAnalyze = process.env.ANALYZE === 'true';


const myPlugins = [
  new WebpackBar({
    name: pkg.name,
    color: '#f7b41e',
    // profile: true,
    // reporters: [ 'profile']
  }),
  // 清空打包文件生成目录，每次打包前执行一次
  new CleanWebpackPlugin(),
  // new webpack.DefinePlugin({
  //   NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),   // wp4不在需要定义NODE_ENV，根据mode自动定义
  // }),
  new webpack.HotModuleReplacementPlugin(),
  // 自动生成html文件，使用html-webpack-template插件指定模板
  new HtmlWebpackPlugin({
    title: pkg.config.appTitle,
    // filename: `${pkg.config.appName}.html`,    // 生成文件名取自 package.json name属性，故初始化项目指定合适name
    filename: `index.html`,    // 生成文件名取自 package.json name属性，故初始化项目指定合适name
    favicon: '',
    template: HtmlWebpackTemplate,        // 使用html-webpack-template插件扩充默认模板
    inject: false,                        // 由html-webpack-template处理文件打包后文件引入，所以此处关闭默认html-webpack-plugin文件注入
    appMountId: config.appMountId,        // 默认app容器id
    mobile: false,                        // 是否开启移动端支持，meta标签
    lang: 'zh-CN',
    links: [],                            // 额外links
    scripts: [],                          // 额外js
    meta: [                               // 指定meta标签
      {
        name: 'renderer',
        content: 'webkit'
      }
    ],
    minify: {                             // 设置代码压缩选项
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
    },
    window: {                             // 设置全局环境变量
      env: {
        apiHost: '',
      }
    }
  }),
  // 单独打包css到独立文件
  new MiniCssExtractPlugin({
    filename: 'css/style_[name]_[hash:6].css',
    // chunkFilename: '[id]_[hash].css',
    allChunks: true,
  }),
];

const monitorPlugin =  new WebpackMonitor({
  capture: true, // -> default 'true'
  target: '../stats/stats.json', // default -> '../monitor/stats.json'
  launch: isAnalyze, // -> default 'false'
  port: 3030, // default -> 8081
  excludeSourceMaps: true // default 'true'
});

isAnalyze && myPlugins.push(monitorPlugin);

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, '../src/index.js'),
    // common: path.join(__dirname, '../src/common.js'),
  },
  output: {
    filename: '[name].[hash:6].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '',
  },
  plugins: myPlugins,
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'common',
          priority: 10,
        }
      }
    },
    concatenateModules: true,
    noEmitOnErrors: true,
  },
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: ['babel-loader'],
        include: [config.srcPath, config.examplePath],
        exclude: [config.nodeModules],  
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isDev ? '[local]_[path]_[name]_[hash:6]' : 'bytom-[hash:6]',
              },
              sourceMap: false,
            }
          }, 'sass-loader', 'postcss-loader'
        ],
        include: [config.srcPath, config.examplePath],
      },
      {
        test: /\.css$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        include: [config.nodeModules],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|bmp)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[path][name].[hash].[ext]',
            outputPath: path.join(__dirname, '../dist/images')
          }
        }]
      }
    ]
  },
  externals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.css', '.json'],
    alias: {
      '_conf': path.join(__dirname, '../src/config.js')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    port: 2333,
    host: '0.0.0.0',
    // https: true,
    overlay: true,
    hot: true,
    open: true,
    useLocalIp: true,
    compress: false,  
    // clientLogLevel: 'none',   // 可选值 none ，info ， warning ， error
    publicPath: '',
    noInfo: true,
    historyApiFallback: true,
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /./, to: '/index.html' }
    //   ]
    // },
  }
};