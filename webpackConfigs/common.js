const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
	module: {
		rules: [
			{
				oneOf: [
					{
						test: /\.(js|mjs|jsx|ts|tsx)$/,
						exclude: /node_modules/,
						use: [
							{
								loader: "babel-loader",
								options: {
									presets: [
										[
											"@babel/preset-env",
											{
												useBuiltIns: "usage",
												corejs: 2,
												targets: {
													chrome: "67",
												},
											},
										],
										"@babel/preset-react",
									],
									plugins: [
										// 引入样式为 css
										// style为true 则默认引入less
										[
											"import",
											{
												libraryName: "antd",
												style: "css",
												libraryDirectory: "es",
											},
										],
									],
								},
							},
							"ts-loader",
						],
					},
					{
						test: /\.css$/,
						use: [
							MiniCssExtractPlugin.loader,
							"css-loader",
							{
								loader: "postcss-loader",
								options: {
									postcssOptions: {
										plugins: [require("autoprefixer")],
									},
								},
							},
						],
					},
					{
						test: /\.less$/,
						use: [
							MiniCssExtractPlugin.loader,
							{
								loader: "css-loader",
								options: {
									modules: {
										localIdentName: "geng-editor-[hash]-[local]",
									},
								},
							},
							{
								loader: "postcss-loader",
								options: {
									postcssOptions: {
										plugins: [require("autoprefixer")],
									},
								},
							},
							{
								loader: "less-loader",
							},
						],
					},
					{
						test: /\.svg/,
						use: ["url-loader"],
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessorPluginOptions: {
				preset: ["default", { discardComments: { removeAll: true } }],
			},
			canPrint: true,
		}),
	],
	resolve: {
		extensions: [".js", ".jsx", ".d.ts", ".ts", ".tsx"],
		mainFiles: ["index"],
		alias: {
			"@alias": path.resolve(__dirname, "../src/alias"),
		},
		symlinks: false,
	},
};
