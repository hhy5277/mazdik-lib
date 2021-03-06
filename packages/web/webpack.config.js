const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/main.ts',
  devtool: isProduction ? 'none' : 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: isProduction ? '[name].[hash].bundle.js' : '[name].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { configFile: 'tsconfig.package.json' }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[hash].css' : '[name].css' ,
      chunkFilename: isProduction ? '[id].[hash].css' : '[id].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/assets/**/*',
          to: './assets',
          transformPath(targetPath, absolutePath) {
            return targetPath.replace(`src${path.sep}assets`, '');
          }
        }
      ]
    })
  ],
  performance: {
    maxEntrypointSize: 1512000,
    maxAssetSize: 1512000
  }
}
