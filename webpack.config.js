var webpack = require('webpack');

module.exports = {
  entry: './client/app',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ],
  module: {
    preLoaders: [
      { test: /\.tag$/, exclude: /node_modules/, loaders: ['babel-loader','riotjs-loader'] }
    ],
    loaders: [
      { test: /\.js$|\.tag$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  devServer: {
    contentBase: './build'
  }
};
