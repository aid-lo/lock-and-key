const Path = require('path');
const FS = require('fs');
const JsMinimizer = require('terser-webpack-plugin');
const CssExtractor = require("mini-css-extract-plugin");
const CssMinimizer = require('css-minimizer-webpack-plugin');
//const HtmlPlugin = require('html-webpack-plugin');

/**
 * Entry points for webpack.
 * @type Object<string>
 */
const webpacks = {};

// Populate webpacks object from folders within src/webpacks folder
(webpackDir => FS.readdirSync(Path.join(__dirname, "src/webpacks"), {withFileTypes: true})
	.filter(entry => entry.isDirectory())
	.map(directory => directory.name)
	.forEach(webpack => webpacks[webpack] = Path.join(webpackDir, webpack))
)(Path.join(__dirname, "src/webpacks"));

/**
 * Webpack config export.
 * @type Object
 */
module.exports = {
	mode: "production",
	entry: webpacks,
	output: {
		filename: "[name].js",
		path: Path.join(__dirname, "dist")
	},
	plugins: [
		new CssExtractor()//,
		// new HtmlPlugin({			// commented out because it creates per-webpack html, but injects all webpacks into each one.
		// 	title: 'Lock & Key',	// annoying so I decided to just do html manually for now.
		// 	filename: '[name].html',
		// 	meta: {
		// 		viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
		// 	}
		// })
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					CssExtractor.loader,
					"css-loader"
				],
			},
		],
	},
	optimization: {
		minimizer: [new JsMinimizer(), new CssMinimizer()],
		minimize: true
	}
};
