const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const { resolveApp } = require('./utils/paths');
const { getStyleLoaders } = require('./utils/loaders');
module.exports = function (env) {
  const config = require(resolveApp(`${__dirname}/config/${env}.config.js`));
  const isProduction = env === 'production';
  return merge(
    {
      mode: env || 'production',
      entry: resolveApp('src/index'),
      output: {
        path: resolveApp('build'),
      },
      resolve: {
        extensions: ['.vue', '.tsx', '.ts', '.ts', '.js'],
        alias: {
          pages: resolveApp('src/pages'),
          components: resolveApp('src/components'),
          router: resolveApp('src/router'),
        }
      },
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
          },
          {
            test: /\.(ts|tsx)?$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        targets: {
                          browsers: [
                            'last 2 versions',
                            'Firefox ESR',
                            '> 1%',
                            'not ie 11',
                          ],
                        },
                      },
                    ],
                  ],
                  plugins: [
                    ['@vue/babel-plugin-jsx', { enableObjectSlots: false }],
                  ],
                },
              },
              {
                loader: 'ts-loader',
                options: {
                  // transpileOnly: true, ??????????????????????????????????????????????????????????????????????????????
                  appendTsSuffixTo: ['\\.vue$'],
                },
              },
            ],
          },
          {
            test: /\.less$/,
            use: getStyleLoaders({}, 'less-loader'),
          }
        ],
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
        isProduction && new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].chunk.css',
        }),
        !isProduction && new webpack.HotModuleReplacementPlugin()
      ].filter(Boolean),
      optimization: {
        minimize: isProduction,
        minimizer: [
          // ?????????????????????????????????????????????minimizer????????????????????????????????????????????????????????????????????????
          // ??????terser-webpack-plugin
          `...`,
          new CssMinimizerWebpackPlugin()
        ]
      }
    },
    config
  );
};
