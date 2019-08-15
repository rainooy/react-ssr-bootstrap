module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
        debug: false,
      },
    ],
  ],
  plugins: [
    'react-hot-loader/babel',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    'babel-plugin-styled-components',
    ['@babel/plugin-proposal-decorators', { legacy: true, },],
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: false,
        corejs: 3,
      },
    ],
  ],
  comments: true,
};
