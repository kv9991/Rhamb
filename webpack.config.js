var webpack = require('webpack');
var path = require('path');
    module.exports = {
        entry: './src/js/main.js',
        output: {
            path: __dirname + "/dist/",
            filename: 'bundle.js'
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
		    {
		        test: /\.less$/,
		        loader: "style!css!less"
		     }
		  ]
		},
	
		watch: true

   };