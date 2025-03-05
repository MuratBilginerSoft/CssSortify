const path = require('path');

module.exports = {
  entry: "./extension.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "extension.js",
    libraryTarget: "commonjs2",
  },
  externals: {
    vscode: "commonjs vscode",
  },

  resolve: {
    extensions: ['.js', '.mjs'],
  },
  mode: "production",
  target: "node",
};
