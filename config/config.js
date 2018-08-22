const path = require('path');

module.exports = {
  rootPath    : path.resolve(__dirname, '../'),                              // 根目录
  distPath    : path.resolve(__dirname, '../dist'),                          // 打包文件夹
  nodeModules : path.resolve(__dirname, '../node_modules'),                  // node包文件夹
  srcPath     : path.resolve(__dirname, '../src'),                           // 页面源码文件夹
  examplePath : path.resolve(__dirname, '../example'),                       // 页面源码文件夹
  appMountId  : 'app',                                                       // mount id
}