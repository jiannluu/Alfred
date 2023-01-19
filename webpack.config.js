const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  mode: process.env.NODE_ENV,
  devServer: {
      host: 'localhost',
      port: 8080,
      static: {
        directory: path.join(__dirname, './build'),
        publicPath: '/',
      },
      proxy: {
        '/api': 'http://localhost:3000',
        '/assets': 'http://localhost:3000',
      },
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: "index.html"
    }),
  ],
}