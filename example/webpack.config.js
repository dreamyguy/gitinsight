var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: {
    'react-app': [
      'webpack-dev-server/client?http://localhost:8881/',
      'webpack/hot/only-dev-server',
      './example/react-app.jsx'
    ]
  },
  output: {
    path: __dirname,
    filename: "[name].js",
    publicPath: 'http://localhost:8881/',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.jsx$|\.es6$|\.js$/,
        loaders: [
          'react-hot',
          'babel-loader'
        ],
        exclude: /node_modules/
      }, {
        test: /\.scss$|\.css$/,
        loader: 'style-loader!style!css!sass'
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        // browse to http://localhost:8880/ during development
        host: 'localhost',
        port: 8880,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:8881/)
        // through BrowserSync
        proxy: 'http://localhost:8881/example/',
        browser: 'google chrome'
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this - when false
        reload: true
      }
    )
  ],
  devtool: "eval-source-map"
};
