const { merge } = require('webpack-merge');
const { resolveApp } = require('./utils/paths');
module.exports = function(env) {
  const config = require(resolveApp(`${__dirname}/config/${env}.config.js`));

  return merge({
    mode: env || 'production',
    entry: resolveApp('src/index'),
    output: {
      path: resolveApp('build'),
    },
    resolve: {
      extensions: ['.vue', '.js'],
    }
  }, config);
}