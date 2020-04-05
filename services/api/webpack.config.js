const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const distFolder = path.resolve(__dirname, 'build');

const webpackConfig = {
  // Environment config
  mode: 'production',
  target: 'node',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },

  // Application config
  entry: {
    app: './src/lambda.ts',
  },
  output: {
    path: distFolder,
    filename: '[name].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new NodemonPlugin({
      ext: 'ts,js',
    }),
  ],
};

if (process.env.NODE_ENV === 'development') {
  webpackConfig.mode = 'development';
  webpackConfig.entry.app = './src/app.local.ts';
  webpackConfig.devtool = 'inline-source-map';
}

module.exports = webpackConfig;
