require("dotenv").config();
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const proxy = require("http-proxy-middleware");

module.exports = {
	mode: process.env.NODE_ENV || "development",
	// watch: true,

	entry: {
		vendor: ["react", "react-dom"],
		client: path.join(__dirname, "src", "client", "index.tsx"),
	},
	output: {
		path: path.join(__dirname, "dist", "client"),
		filename: "[name].[hash].js",
		chunkFilename: "[name].[hash].chunk.js",
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: "initial",
					name: "vendor",
					enforce: true,
				},
			},
		},
	},
	node: {
		fs: "empty",
		net: "empty",
	},
	resolve: {
		extensions: [".js", ".ts", ".tsx"],
		plugins: [
			new TsconfigPathsPlugin({
				extensions: [".ts", ".tsx"],
			}),
		],
	},

	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				exclude: /node_module/,
				loader: "babel-loader",
			},
			{
				test: /\.(tsx|ts)$/,
				exclude: /node_module/,
				loader: "ts-loader",
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						options: {
							minimize: true,
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
		}),
		new LodashModuleReplacementPlugin(),
		new Dotenv(),
	],
	devServer: {
		inline: true,
		hot: true,
		host: "localhost",
		port: process.env.DEV_CLIENT_PORT,
	},
};
