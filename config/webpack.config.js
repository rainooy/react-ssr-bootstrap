const path = require('path');
const pkg = require('../package.json');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');      // 生成html文件
const HtmlWebpackTemplate = require('html-webpack-template');
const WebpackMonitor = require('webpack-monitor');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MiniCssFile = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HappyPack = require('happypack');
const InlineMainfestPlugin = require('inline-manifest-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');

const config = require('./config.js');

const isDev = process.env.NODE_ENV === 'development';
const isTestnet = process.env.TEST_NET === 'true';
const isMainnet = process.env.MAIN_NET === 'true';
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
  // 自动生成html文件，使用html-webpack-template插件指定模板
  new HtmlWebpackPlugin({
    title: pkg.config.appTitle,
    // filename: `${pkg.config.appName}.html`,    // 生成文件名取自 package.json name属性，故初始化项目指定合适name
    filename: `index.html`,    // 生成文件名取自 package.json name属性，故初始化项目指定合适name
    favicon: path.join(__dirname, '../src/assets/images/favicon.ico'),
    template: HtmlWebpackTemplate,        // 使用html-webpack-template插件扩充默认模板
    inject: false,                        // 由html-webpack-template处理文件打包后文件引入，所以此处关闭默认html-webpack-plugin文件注入
    appMountId: config.appMountId,        // 默认app容器id
    mobile: false,                        // 是否开启移动端支持，meta标签
    lang: 'en-US',
    links: [],                            // 额外links
    scripts: [],                          // 额外js
    inlineManifestWebpackName: 'runtime',
    meta: [                               // 指定meta标签
      {
        name: 'renderer',
        content: 'webkit'
      },
      {
        name: 'keywords',
        content: 'btmscan,bytomscan,btm scan,bytom scan,btm block explorer,bytom,btm,比原链,比原,矿工,矿机,挖矿,比原链区块浏览器,比原浏览器,区块链浏览器'
      },
      {
        name: 'description',
        content: 'BTM Block Explorer - BTM Blocks, Transactions, Addresses and Mining data'
      },
      {
        name: 'viewport',
        content: 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
      }
    ],
    minify: {                             // 设置代码压缩选项
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
    },
    window: {                             // 设置全局环境变量
      env: {
        name: pkg.config.appName,
        apiHost: isTestnet ? config.apiHostTestNet : isMainnet? config.apiHostProd : isDev ? config.apiHostDev : config.apiHostProd,
        apiHostKit: config.apiHostKit,
        wsHost: isMainnet ? config.wsHostProd : isDev ? config.wsHostDev : config.wsHostProd,
        version: pkg.version,
      }
    },
    bodyHtmlSnippet: '<span style="display: none"><script data-id="bytom" src="https://s23.cnzz.com/z_stat.php?id=1275681890&web_id=1275681890" language="JavaScript"></script></span>',
  }),
  new InlineMainfestPlugin(),
  // 单独打包css到独立文件
  new MiniCssExtractPlugin({
    filename: 'css/style_[name]_[contenthash:6].css',
    // chunkFilename: '[id]_[hash].css',
    allChunks: true,
  }),
  // new ProgressPlugin(),
  new webpack.ProvidePlugin({
    _conf: '_conf',
    _util: [path.join(__dirname, '../src/utils/common.js'), 'default'],
    _ajax: [path.join(__dirname, '../src/utils/ajax.js'), 'default'],
    Msg: ['react-intl', 'FormattedMessage'],
    // moment: 'moment',
    React: 'react',
    Svg: ['react-svg-inline', 'default'],
    ReactDOM: 'react-dom',
    Component: ['react', 'Component'],
    PureComponent: ['react', 'PureComponent'],
    connect: ['react-redux', 'connect'],
    Link: ['react-router-dom', 'Link'],
    classnames: ['classnames/bind'],
    css: ['styled-components', 'default'], 
  }),
  new HappyPack({
    loaders: ['babel-loader'],
    threads: 4,
  }),
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en/),
];

const monitorPlugin =  new WebpackMonitor({
  capture: true,
  target: '../stats/stats.json',
  launch: isAnalyze,
  port: 3030,
  excludeSourceMaps: true
});

isAnalyze && myPlugins.push(monitorPlugin);
isDev && myPlugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, '../src/index.js'),
    // common: path.join(__dirname, '../src/common.js'),
  },
  output: {
    filename: isDev ? 'js/[name].[hash:6].js' : 'js/[name].[chunkhash:6].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
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
          test: /(react|redux|immutable)/,
          chunks: 'initial',
          priority: 10,
        },
        echarts: {
          test: /(echarts|zrender)/,
          chunks: 'initial',
          priority: 10,
        },
        antd: {
          test: /(antd|rc-)/,
          chunks: 'initial',
          priority: 10,
        },
        libs: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'libs',
          priority: -10,
        },
      }
    },
    minimizer: [
      new MiniCssFile({}),
      new UglifyJsPlugin({
        parallel: true,
        cache: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          }
        }
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
        use: 'happypack/loader',
        // use: 'babel-loader',
        include: [config.srcPath],
        exclude: [config.nodeModules],  
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDev,
              localIdentName: isDev ? '[name]-[local]_[hash:6]' : 'bytom-[name]-[hash:6]',
            }
          }, 'sass-loader', 'postcss-loader'
        ],
        include: [config.srcPath],
      },
      {
        test: /\.css$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        include: [config.nodeModules],
      },
      {
        test: /\.less$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            }
          }
        ],
        include: [config.nodeModules],
      },
      {
        test: /\.(jpg|jpeg|png|gif|bmp)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[hash].[ext]',
            outputPath: '../dist/images',
            publicPath: '/images'
          },
        },{
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
          }
        }]
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      }
    ]
  },
  externals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.css', '.json'],
    alias: config.alias
  },
  devServer: {
    // contentBase: path.join(__dirname, '../dist'),
    port: pkg.config.port,
    host: '0.0.0.0',
    // https: true,
    overlay: false,
    hot: true,
    open: true,
    useLocalIp: true,
    compress: false,  
    // clientLogLevel: 'none',   // 可选值 none ，info ， warning ， error
    publicPath: '/',
    noInfo: true,
    historyApiFallback: true,
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /./, to: '/index.html' }
    //   ]
    // },
    // before() {
    //   console.log('start with development mode.');
    // },
    // after() {
    //   console.log('completed.');
    // },
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};