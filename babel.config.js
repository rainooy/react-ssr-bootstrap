module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: false },
        include: [],
        debug: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    ['babel-plugin-styled-components', { displayName: false }],
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    [
      'import',
      {
        libraryName: 'antd-mobile',
        libraryDirectory: 'lib',
        style: 'css',
      },
      'antd-mobile',
    ],
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
      'antd',
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
