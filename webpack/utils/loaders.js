const postcssPresetEnv = require('postcss-preset-env');
const isProduction = process.env.NODE_ENV === 'production';
function getStyleLoaders(cssOption, preLoader) {
  const loaders = [
    'style-loader',
    isProduction && {
      loader: require('mini-css-extract-plugin').loader,
    },
    {
      loader: 'css-loader',
      options: cssOption,
    },
  ].filter(Boolean);

  if (preLoader) {
    const preLoaders = [
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              require('postcss-flexbugs-fixes')(),
              postcssPresetEnv({
                stage: 3, // 使用第三阶段特性
                autoprefixer: {
                  grid: true,
                  flexbox: 'no-2009',
                },
                browsers: 'last 2 versions'
              }),
              require('postcss-normalize')(),
            ],
          },
        },
      },
      preLoader,
    ];
    loaders.splice(loaders.length, 0, ...preLoaders);
  }

  return loaders;
}

module.exports = {
  getStyleLoaders,
};
