var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
  	card: './src/card.js',
    table: './src/table.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/build'
  },
  module: {
  	loaders: [
  		{
  			test: /\.(js|jsx)$/,
  			loader: 'babel-loader',
  			exclude: /node_modules/,
  			query: {
  				presets: ['es2015', 'react']
  			} 
  		},
  		{
  			test: /\.css$/,
  			loaders: ['style', 'css']
  		},
      { 
        test: /\.png$/, 
        loader: "url-loader?limit=100000" 
      },
      { 
        test: /\.jpg$/, 
        loader: "file-loader" 
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
  	]
  },
  plugins: [
  	new CopyWebpackPlugin(
  		[
  			{from: './src/*.html', flatten: true},
  			// {from: './src/*.css'},
  			// {from: './src/*.svg'}
  		],
  		{
  			ignore: [
  				'*.js',
  				'*.css'
  			]
  		}
  	)
  ]
}