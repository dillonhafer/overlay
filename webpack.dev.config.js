var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.base.config');

var config = _.merge(
  webpackConfig({
    hot: true,
    build: true,
    plugins: [],
    eslintrcPath: './_dev.eslintrc'
  }),
  {
    output: {
      path: path.join(__dirname),
      publicPath: '/',
      filename: 'options.dev.js'
    },
    devtool: 'inline-source-map'
  }
);

module.exports = config;
