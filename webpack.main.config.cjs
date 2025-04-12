const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/main.js',
  target: 'electron-main',
  mode: 'development',
  output: {
    filename: 'index.cjs',
    path: path.resolve(__dirname, '.webpack/main'),
    library: { type: 'commonjs2' },
  },
  externals: [nodeExternals()],
  externalsPresets: {
    node: true,
  },
  module: {
    rules: [
      {
        test: /native_modules[/\\].+\.node$/,
        use: 'node-loader',
      },
      {
        test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
        parser: { amd: false },
        use: {
          loader: '@vercel/webpack-asset-relocator-loader',
          options: {
            outputAssetBase: 'native_modules',
          },
        },
      },
    ],
  },
resolve: {
  extensions: ['.js'],
  fallback: {
    child_process: false,
    path: false,
    url: false,
  }
},

};
