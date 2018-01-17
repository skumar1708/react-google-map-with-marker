var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        use: [
                {loader:'react-hot-loader'}, 
                {
                  loader:'babel-loader',
                  query: {
                    presets: ['es2015']
                  }
                }
            ],
        include: path.join(__dirname, 'src')
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.css$/,
      loaders: ['style-loader','css-loader']
    }
  ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
 ]
};
