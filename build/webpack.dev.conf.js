'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

// 请求server
const express = require('express');
const app = express();
const gameData = require('../static/data/games.json'); // 加载本地游戏数据
const slideData = require('../static/data/sliders'); // 引入轮播图数据
const pageSize = 12; // 定义每次加载数据的条数
const apiRoutes = express.Router();
app.use('/api', apiRoutes); // 通过路由请求数据

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const devWebpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
	},
	// cheap-module-eval-source-map is faster for development
	devtool: config.dev.devtool,
	// these devServer options should be customized in /config/index.js
	devServer: {
		clientLogLevel: 'warning',
		historyApiFallback: {
			rewrites: [
				{from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
			],
		},
		hot: true,
		contentBase: false, // since we use CopyWebpackPlugin.
		compress: true,
		host: HOST || config.dev.host,
		port: PORT || config.dev.port,
		open: config.dev.autoOpenBrowser,
		overlay: config.dev.errorOverlay
			? {warnings: false, errors: true}
			: false,
		publicPath: config.dev.assetsPublicPath,
		proxy: config.dev.proxyTable,
		quiet: true, // necessary for FriendlyErrorsPlugin
		watchOptions: {
			poll: config.dev.poll,
		},
		before(app) {
			// 读取轮播图
			app.get('/api/slide', (req, res) => {
				res.setHeader('Content-type', 'application/json;charset=utf-8');
				res.end(JSON.stringify(slideData));
			});
			// 取得对应栏目下的所有游戏
			app.get('/api/games', (req, res) => {
				let gameCategory = req.query.category; // 取得游戏类别
				//console.log(gameCategory);
				if (gameCategory) {
					let gameList = gameData.find(item => item.category === gameCategory);
					res.setHeader('Content-type', 'application/json;charset=utf-8');
					res.end(JSON.stringify(gameList.list));
				} else {
					res.setHeader('Content-type', 'application/json;charset=utf-8');
					res.end(JSON.stringify(gameData));
				}
			});
			// 通过id查找对应的游戏
			app.get('/api/detail', (req, res) => {
				let gameCategory = req.query.category,
					id = parseInt(req.query.id);
				if (gameCategory) {
					let gameList = gameData.find(item => item.category === gameCategory);
					let someGame = (gameList.list).find(val => val.id === id);
					res.setHeader('Content-type', 'application/json;charset=utf-8');
					res.end(JSON.stringify(someGame));
				}
			});
			// 每次读取`pageSize`条数据
			app.get('/api/page', (req, res) => {
				let offset = parseInt(req.query.offset) || 0,
					gameCategory = req.query.category;
				let gameList = gameData.find(item => item.category === gameCategory);
				// 每次在偏移量`offset`的基础上加`pageSize`条
				let result = gameList.list.slice(offset, offset + pageSize);
				let hasMore = true; // 默认有加载更多

				// 如果加载条数大于总条数
				if (offset + pageSize >= gameList.list.length) {
					hasMore = false;
				}
				res.setHeader('Content-type', 'application/json;charset=utf-8');
				res.end(JSON.stringify({hasMore, games: result}));
			});
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': require('../config/dev.env')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
		new webpack.NoEmitOnErrorsPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		}),
		// copy custom static assets
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, '../static'),
				to: config.dev.assetsSubDirectory,
				ignore: ['.*']
			}
		])
	]
});

module.exports = new Promise((resolve, reject) => {
	portfinder.basePort = process.env.PORT || config.dev.port;
	portfinder.getPort((err, port) => {
		if (err) {
			reject(err)
		} else {
			// publish the new Port, necessary for e2e tests
			process.env.PORT = port;
			// add port to devServer config
			devWebpackConfig.devServer.port = port;

			// Add FriendlyErrorsPlugin
			devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
				compilationSuccessInfo: {
					messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
				},
				onErrors: config.dev.notifyOnErrors
					? utils.createNotifierCallback()
					: undefined
			}));

			resolve(devWebpackConfig);
		}
	});
});