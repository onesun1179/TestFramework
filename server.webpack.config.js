const Dotenv = require("dotenv").config();
const path = require("path");
const nodeExternals = require(`webpack-node-externals`);

module.exports = {
	mode: process.env.NODE_ENV || "development",
	// watch: true,
	target: "node",
	entry: {
		server: "./src/server/index.ts",
	},
	output: {
		path: path.join(__dirname, "dist", "server"),
		publicPath: "/",
		filename: "[name].bundle.js",
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_module/,
				loader: "babel-loader",
			},
			{
				test: /\.ts$/,
				exclude: /node_module/,
				loader: "ts-loader",
			},
		],
	},
	devServer: {
		hot: true,
		host: "localhost",
		port: process.env.DEV_SERVER_PORT,
	},
	externals: [nodeExternals()],
};
