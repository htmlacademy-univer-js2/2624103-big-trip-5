const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
 output: {
  filename: 'js/main.[contenthash].js',
  path: path.resolve(__dirname, 'build'),
  publicPath: '/', 
},
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'), 
    },
    hot: true,
    port: 3000,
    historyApiFallback: true, 
  },
  plugins: [
   new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body', 
  minify: false 
}),
   new CopyPlugin({
  patterns: [
    {
      from: 'public',
      to: '',
      globOptions: {
        ignore: ['**/*.html'] 
      }
    }
  ]
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