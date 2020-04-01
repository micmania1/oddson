const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const distFolder = path.resolve(__dirname, 'build');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  // Environment config
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  target: 'node',
  externals: nodeModules,

  // Application config
  entry: {
    app: process.env.NODE_ENV === 'development' ? './src/app.local.js' : './src/app.serverless.js',
  },
  output: {
    path: distFolder,
    filename: '[name].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new NodemonPlugin(),
  ],
  devtool: 'inline-source-map',
};
