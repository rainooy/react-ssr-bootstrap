const path = require('path');

module.exports = {
<<<<<<< HEAD
  rootPath    : path.resolve(__dirname, '../'),                              // 根目录
  distPath    : path.resolve(__dirname, '../dist'),                          // 打包文件夹
  nodeModules : path.resolve(__dirname, '../node_modules'),                  // node包文件夹
  srcPath     : path.resolve(__dirname, '../src'),                           // 页面源码文件夹
  examplePath : path.resolve(__dirname, '../example'),                       // 页面源码文件夹
  appMountId  : 'app',                                                       // mount id
=======
  rootPath    : path.resolve(__dirname, '../'),                              // root path
  distPath    : path.resolve(__dirname, '../dist'),                          // build output path
  nodeModules : path.resolve(__dirname, '../node_modules'),                  // default node modules path
  srcPath     : path.resolve(__dirname, '../src'),                           // source code path
  appMountId  : 'app',    
  apiHostDev  : '',
  apiHostProd : '',                                                   // reactjs mount element id
  // apiHostProd : 'http://139.224.11.46/api',                                                   // reactjs mount element id
  alias: {                                                                   // alias conf
    '_conf': path.join(__dirname, '../src/conf/config.js'),
    '_utils': path.join(__dirname, '../src/utils'),
  }
>>>>>>> 3cc45bbc9da8997b764f9cd85b87aec6c2ae6c94
}