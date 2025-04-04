const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.[contenthash].js', 
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    port: 3000,
  },
  plugins: [
   
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',         
      inject: 'body',                 
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: 'public', 
          to: 'build',
          globOptions: {
            ignore: ['**/index.html'] 
          }
        },
      ],
    }),
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3,
              }]
            ]
          }
        }
      },
    ]
  },
};