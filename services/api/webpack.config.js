const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

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

    // Allows us to run our application as a nodejs app locally
    new NodemonPlugin({
      ext: 'ts,js',
    }),

    // Create a zip for lambda
    new ZipPlugin({
      filename: 'app.zip',
    }),
  ],
};

if (process.env.NODE_ENV === 'development') {
  webpackConfig.mode = 'development';
  webpackConfig.devtool = 'inline-source-map';

  // app.local.ts returns our application without the aws-serverless-express
  // wrapper.
  webpackConfig.entry.app = './src/app.local.ts';
}

module.exports = webpackConfig;
