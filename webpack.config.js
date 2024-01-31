const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Determine if we are in development mode based on the NODE_ENV variable
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  // Mode is determined by the environment variable
  mode: isDevelopment ? 'development' : 'production',
  
  // Point d'entrée de votre application
  entry: './src/app.js',
  
  // Sortie des bundles
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Nettoie le dossier dist avant de reconstruire
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
          // Utiliser style-loader en développement et MiniCssExtractPlugin en production
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',   // traduit le CSS en CommonJS
          'sass-loader'   // compile Sass en CSS
        ],
      },
      {
        // Chargement des images
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        // Chargement des polices de caractères et autres fichiers statiques
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  
  // Plugins
  plugins: [
    // Plugin pour générer l'index.html avec injection du bundle
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // Conditionally add this plugin for production only
    ...(!isDevelopment ? [new MiniCssExtractPlugin({
      filename: 'styles.css',
    })] : []),
  ],

  // Configuration du serveur de développement
  devServer: {
    static: './dist',
    open: true,
    hot: true,
    port: 3000,
    historyApiFallback: true, // Add this for SPA routing
  },
};
