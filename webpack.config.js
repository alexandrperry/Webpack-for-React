const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
require('babel-polyfill');

module.exports = {
  entry: [
      'babel-polyfill',
    'react-hot-loader/patch',
    './client/src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
        {
            test: /\.sass$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
        },

        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'resolve-url-loader']
        },

        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'file-loader'
        },
        {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        },
        // {
        //     test: /\.(png|jpg|)$/,
        //     loader: 'url-loader?limit=200000'
        // }
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            loader: 'image-webpack-loader'
        }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, './client/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
      //new BundleAnalyzerPlugin()

  ],
  devServer: {
    contentBase: './client/dist',
    hot: true,
    historyApiFallback: true,
      proxy: {
             '/api/*': {
               target: 'http://localhost:3000',
               secure: false
             }

           }
  }
};

