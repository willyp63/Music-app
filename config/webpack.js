var path = require("path");

const APP_ENTRY_PATH = path.resolve(__dirname, '../client/app/entry.jsx');
const SCRIPTS_PATH = path.resolve(__dirname, '../client/scripts');

module.exports = {
  context: __dirname,
  entry: APP_ENTRY_PATH,
  output: {
    path: SCRIPTS_PATH,
    filename: "app.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  devtool: 'source-maps'
};
