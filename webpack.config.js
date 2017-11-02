var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var src = path.join(__dirname, 'src');

var config = {
  devServer: {
    hot: true,
    inline: true,
  },
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  },
  entry: {
    styles: path.join(src, 'styles.styl'),
    index: path.join(src, 'index.pug'),
    bundle: path.join(src, 'bundle.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use:  ['html-loader', 'pug-html-loader?pretty&exports=false']
      },
      
      /*{
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },*/
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
      test: /\.stly$/, 
      loader: ExtractTextPlugin.extract("style", "css!stylus")
      },
      {
    		test: /\.js$/,
    		exclude: /(node_modules|bower_components)/,
    		loader: 'babel-loader',
    		query: {
    		presets: ['es2015']
    		}
	    }
    ]
  },
  

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'index.html',
      template: path.join(src, 'index.pug'),
    }),
    new ExtractTextPlugin('[name].css')
  ],
};

module.exports = config;