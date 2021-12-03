process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const webpackFactory = require('../webpack/webpack.config');

const complier = webpack(webpackFactory('production'));
complier.run();