const path = require('path');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
dotenv.config({ path: path.join(__dirname, '../env', '.env') });

const MAP_API_KEY = process.env.SQUAD_MAP_CLIENT_ID;

module.exports = {
  context: __dirname,
  entry: '../src/index.tsx',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../build'),
    clean: true,
    assetModuleFilename: 'assets/[hash][ext][query]',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '../public/index.html',
      mapApiUrl: `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${MAP_API_KEY}`,
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
