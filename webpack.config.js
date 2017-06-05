const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      // load and compile javascript
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.css$/, loader: "css-loader" },
      { test: /\.html$/, exclude: /node_modules/, loader: "raw-loader" }
    ]
  },

  // inject js reference bundle to index.html
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/frontend/index.html',
      inject: 'body',
      minify: { removeAttributeQuotes: true }
    }),
    new CopyWebpackPlugin([{
      from: 'src/frontend/assets',
      to: 'assets'
    }]),
    new CopyWebpackPlugin([{
      from: 'node_modules/bootstrap/dist/css/',
      to: 'bootstrap'
    }])
  ],

  devtool: '#inline-source-map'
};