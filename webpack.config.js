var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var extractLESS = new ExtractTextPlugin('styles/[name].css',  {
    allChunks: true
});

var MODULE_BUILD_CSS_DIR = path.resolve(__dirname, 'src/css');

function getPlugins() {
    var plugins = [];

    plugins.push(extractLESS);

    return plugins;
}


    module.exports = {
    	plugins: getPlugins(),
        entry: './src/js/main.js',
        output: {
            path: __dirname + "/dist/",
            filename: '[name].js'
        },
       module: {
		  loaders: [
		    {
		      loader: "babel-loader",

		      // Skip any files outside of your project's `src` directory
		      include: [
		        path.resolve(__dirname, "src"),
		      ],

		      // Only run `.js` and `.jsx` files through Babel
		      test: /\.jsx?$/,

		      // Options to configure babel with
		      query: {
		        plugins: ['transform-runtime', ["transform-object-rest-spread", { "useBuiltIns": true }]],
		        presets: ['es2015', 'react', 'stage-0'],
		      }
		    },
		    { test: /\.less$/i, loader: extractLESS.extract(['css','less'])},
		    { test: /\.css$/, include: MODULE_BUILD_CSS_DIR, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
		  ]
		},
	
		watch: true

   };