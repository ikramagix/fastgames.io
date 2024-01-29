const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: "./dist",
  },
};

{
    test: /\.scss$/,
    use: [
      'style-loader', // Injecte le CSS dans le DOM
      'css-loader',   // Traduit le CSS en CommonJS
      'sass-loader'   // Compile le SCSS en CSS
    ],
  },
  