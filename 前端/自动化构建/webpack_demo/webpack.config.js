var webpack = require('webpack');
module.exports = {

	//每个页面的js文件
	entry: {
		module: "js/module.js",

	},
	//source maps
	devtool: 'eval-source-map',
	//生成到当前目录下
	resolve: {
		modulesDirectories: ['.']
	},
	devserver: {
		contentBase: 'dist',
		colors: true, //终端中输出结果为彩色
		historyApiFallback: true, //不跳转
		inline: true //实时刷新
	},
	output: {
		path: 'dist', //打包输出目录
		publicPath: "/static/build/", //webpack-dev-server访问的路径
		filename: "[name].js", //输出文件名
		chunkFilename: "bundle-[id].js" //输出chunk文件名
	},
	module: {
		loaders: [{
				test: /\.css$/,
				loader: 'style!css'
			}, {
				test: /\.json$/,
				loader: "json"
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel', //在webpack的module部分的loaders里进行配置即可
				query: {
					presets: ['es2015']
				}
			}

		]
	},
	plugins: [
		new webpack.BannerPlugin('This file is created by zhaoda')
	]

};