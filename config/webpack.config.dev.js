const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

// App files location
const PATHS = {
  root: path.resolve(__dirname, '../src'),
  app: path.resolve(__dirname, '../src/js'),
  styles: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../src'),
  web: 'http://localhost:8888/'
};

var scssIncludePaths = [];

const plugins = [
  // Shared code
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'scripts/vendor.bundle.js'}),
  // Avoid publishing files when compilation fails
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true'))
  }),
  new HtmlWebpackPlugin({
    inject: false,
    template: path.resolve(PATHS.root, 'index.ejs'),
    mobile: true,
    // favicon: path.resolve(PATHS.root, 'favicon.ico'),
    files: {
      css: [ "app_[hash].css" ],
      js: [ "app_[hash].js", "vendor.bundle_[hash].js", ]
    },
    chunks: {
      head: {
        css: [ "app_[hash].css" ]
      },
      main: {
        entry: "app_[hash].js"
      },
    }
  })
];

const sassLoaders = [
  'style-loader',
  'css-loader',
  'postcss-loader',
  'sass-loader'
];

module.exports = {
  entry: {
    app: path.resolve(PATHS.app, 'index.js'),
    vendor: ['react']
  },
  output: {
    path: PATHS.build,
    publicPath: PATHS.web,
    filename: '[name].js'
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
      js: path.resolve(__dirname, '../src/js')
    },
    // We can now require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
        include: PATHS.app
      },
      {
        test: /\.scss$/,
        loader: sassLoaders.join('!')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.(woff|woff2)(\?)?(\#[a-zA-Z0-9]+)?(\&)?(v=\d+\.\d+[\.\d]+)?(\#[a-zA-Z0-9]+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.(ttf|eot|svg)(\?)?(\#[a-zA-Z0-9]+)?(\&)?(v=\d+\.\d+[\.\d]+)?(\#[a-zA-Z0-9]+)?$/,
        loader: "file-loader"
      },
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  sassLoader:
  {
    includePaths:  scssIncludePaths
  },
  watchOptions: {
    poll: true
  },
  plugins: plugins,
  postcss: function () {
    return [autoprefixer({
      browsers: ['last 2 versions']
    })];
  },
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    port: 8888,
    historyApiFallback: true,
    hot: true,
    inline: true
  },
  devtool: 'eval'
};
