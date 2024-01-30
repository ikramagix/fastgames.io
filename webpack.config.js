const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Mode de développement pour un meilleur débogage
  mode: 'development',
  
  // Point d'entrée de votre application
  entry: './src/index.js',
  
  // Sortie des bundles
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  
  // Règles pour les modules
  module: {
    rules: [
      {
        // Transpile les fichiers .js avec Babel
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // Traitement des fichiers SCSS
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // extrait le CSS dans des fichiers séparés
          'css-loader',   // traduit le CSS en CommonJS
          'sass-loader'   // compile Sass en CSS
        ],
      },
    ],
  },
  
  // Plugins
  plugins: [
    // Plugin pour générer l'index.html avec injection du bundle
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    
    // Plugin pour extraire le CSS dans des fichiers séparés
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],

  // Configuration du serveur de développement
  devServer: {
    static: './dist',
    open: true,
    hot: true,
  },
};