const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ROOT_PATH = path.resolve(__dirname, "..");
const BUILD_DIR = path.resolve(ROOT_PATH, 'dist');
const CONFIG_DIR = path.resolve(ROOT_PATH, 'config');
const SRC_DIR = path.resolve(ROOT_PATH, 'src');


const extractSass = new ExtractTextPlugin({
  filename: "react-stateful-forms.css",
  disable: false
});

const config = {
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    open: true,
    port: 3001,
    historyApiFallback: true,
    openPage: '',
  },
  entry: ['babel-polyfill', path.resolve(ROOT_PATH, 'examples', 'index.tsx'), path.resolve(SRC_DIR, 'styles.scss')],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: [

    extractSass,

    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(CONFIG_DIR, 'index_template.html'),
      title: 'React-Stateful-Forms'
    })

  ],
  module: {
    rules: [{
        test: /\.tsx?$/,
        enforce: "pre",
        loader: 'tslint',
        options: {
          configFile: path.resolve(ROOT_PATH, 'config', 'tslint.json'),
          emitErrors: true,
          failOnHint: true,
          failOnError: true
        },
        exclude: path.resolve(ROOT_PATH, 'node_modules')
      },
      {
        test: /\.(css)$/,
        use: [{
            loader: 'style'
          },
          {
            loader: 'css'
          },
          {
            loader: 'postcss',
            options: {
              config: {
                path: path.resolve(CONFIG_DIR, 'postcss.config.js')
              }
            }
          }
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          { loader: 'style' },
          { loader: 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'},
          {
            loader: 'postcss',
            options: { config: { path: path.resolve(CONFIG_DIR, 'postcss.config.js') } }
          },
          { loader: 'sass' }
        ],
        exclude: SRC_DIR
      },
      {
        test: /\.(sass|scss)$/,
        // use: [
        //   { loader: 'style' },
        //   { loader: 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'},
        //   {
        //     loader: 'postcss',
        //     options: { config: { path: path.resolve(CONFIG_DIR, 'postcss.config.js') } }
        //   },
        //   { loader: 'sass' }
        // ],
        use: extractSass.extract({
          use: [
            {
              loader: 'css'
            },
            {
              loader: 'postcss',
              options: {
                config: {
                  path: path.resolve(CONFIG_DIR, 'postcss.config.js')
                }
              }
            },
            {
              loader: 'sass'
            }
          ],
          fallback: 'style-loader'
        }),
        include: SRC_DIR
      },
      {
        test: /\.(png|jpg|svg|gif|ttf|woff|woff2|ico|eot)$/,
        loader: "url-loader?limit=1000000",
        exclude: path.resolve(ROOT_PATH, 'node_modules', 'font-awesome')
      },
      {
        test: /\.jsx?$/,
        include: ROOT_PATH,
        loader: 'babel-loader',
        options: {
          extends: path.resolve(ROOT_PATH, 'config', '.babelrc')
        },
        exclude: path.resolve(ROOT_PATH, 'node_modules')
      },
      {
        test: /\.tsx?$/,
        include: ROOT_PATH,
        use: [{
            loader: 'babel-loader',
            options: {
              extends: path.resolve(ROOT_PATH, 'config', '.babelrc')
            }
          },
          {
            loader: 'ts-loader',
          }
        ],
        exclude: path.resolve(ROOT_PATH, 'node_modules')
      }
    ]
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  },
  resolve: {
    modules: [
      SRC_DIR, 'node_modules'
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.sass', 'scss', 'json', 'png', 'jpg'],
    alias: {
      "react-stateful-forms": path.resolve(ROOT_PATH, 'lib')
    }
  }
};

module.exports = config;