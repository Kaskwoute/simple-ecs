const WebpackShellPlugin = require('./WebpackShellPlugin');

const merge = require('webpack-merge');
const prod = require('./prod');

module.exports = merge(prod, {
  mode: 'development',
  devtool: 'inline-source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new WebpackShellPlugin({ onBuildEnd: ['yalc publish --push'] }),
  ]
});
