const ESLintPlugin = require('eslint-webpack-plugin');
const { resolveApp } = require('../utils/paths');
module.exports = {
  devtool: 'cheap-source-map',
  output: {
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].chunk.js',
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.ts', '.tsx', '.js', '.vue'],
      files: resolveApp('src'),
    })
  ]
};
