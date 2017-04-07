var path = require('path')
var webpack = require('webpack')

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var plugins = [
	//将样式统一发布到style.css中
  new ExtractTextPlugin({
  	filename:'css/style.css',
    allChunks: true
  })
];

module.exports = {
  entry: {
  	common:'./src/common.js',
  	main:'./src/js/main.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({fallback:"style-loader", use:"css-loader"})
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({fallback:"style-loader", use:"css-loader!less-loader"})
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
　　　　　　test: /\.(png|jpg|gif)$/,
　　　　　　loader:"url-loader?limit=8192&name=images/[hash:8].[name].[ext]"
　　　　}
    ]
  },
  plugins: plugins,
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
