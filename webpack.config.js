const path = require('path');

const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
	// entry: entries,
  entry: {
    'editor-style': './src/scss/editor.scss',
    'front-style': './src/scss/front.scss',
    'editor-script': './src/js/editor.js',
    'front-script': './src/js/front.js'
  },
	output: {
    hashFunction: "xxhash64",
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js'
	},
	module: {
		rules: [
      {
        test: /\.(css|scss)/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                sourceMap: true,
                implementation: require( 'sass' ),
              }
            },
          },

        ],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
	},
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin( {
      filename: '[name].min.css',
      chunkFilename: '[id].min.css',
    } ),
  ],
};