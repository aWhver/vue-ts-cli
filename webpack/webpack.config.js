const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { resolveApp } = require('./utils/paths');
module.exports = function(env) {
  const config = require(resolveApp(`${__dirname}/config/${env}.config.js`));

  return merge(
    {
      mode: env || 'production',
      entry: resolveApp('src/index'),
      output: {
        path: resolveApp('build'),
      },
      resolve: {
        extensions: ['.vue', '.ts', '.js'],
      },
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          }
        ]
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: 'index.html',
          title: 'vue-ts-cli',
          inject: true,
          minify: env === 'production',
        }),
        new VueLoaderPlugin(),
      ],
    },
    config
  );
};
