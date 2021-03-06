process.env.NODE_ENV = 'development';

const webpack  = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackFactory = require('../webpack/webpack.config');
const open = require('open');

const complier = webpack(webpackFactory('development'));
const options = {
  // disableHostCheck: true,
  compress: true,
  // hot: true,
  open: true,
  // quiet: true,
  overlay: false,
};

complier.hooks.invalid.tap('invalid', () => {
  console.log('start complie....');
});

complier.hooks.done.tap('done', (stats) => {
  console.log(process.env.BROWSER);
});

const server = new WebpackDevServer(complier, options);

server.listen(4000, '0.0.0.0', () => {});