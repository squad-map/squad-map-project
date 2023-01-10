const path = require('path');

const dotenv = require('dotenv');
const { merge } = require('webpack-merge');

dotenv.config({ path: path.join(__dirname, '../env', '.env.development') });

const common = require('./webpack.common');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
  },
});
