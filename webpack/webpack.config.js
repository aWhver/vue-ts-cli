const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { resolveApp } = require('./utils/paths');
module.exports = function (env) {
  const config = require(resolveApp(`${__dirname}/config/${env}.config.js`));

  return merge(
    {
      mode: env || 'production',
      entry: resolveApp('src/index'),
      output: {
        path: resolveApp('build'),
      },
      resolve: {
        extensions: ['.vue', '.tsx', '.ts', '.ts', '.js'],
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
                  // transpileOnly: true, 加速编译，会丢失不同依赖项之间静态类型检查的部分好处
                  appendTsSuffixTo: ['\\.vue$']
                }
              }
            ],
          },
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
      ],
    },
    config
  );
};
