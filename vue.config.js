const express = require('express');
const path = require('path');

const app = express();

var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();
app.use('/api', apiRoutes);

module.exports = {
    baseUrl: '/',

    // 输出文件目录
    outputDir: 'dist',

    //如果你想要在生产构建时禁用 eslint-loader，你可以用如下配置
    lintOnSave: process.env.NODE_ENV !== 'production',

    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        before (app) {
            app.get('/api/seller', function (req, res) {
                res.json({
                    errno: 0,
                    data: seller
                })
            })
            app.get('/api/goods', function (req, res) {
                res.json({
                    errno: 0,
                    data: goods
                })
            })
            app.get('/api/ratings', function (req, res) {
                res.json({
                    errno: 0,
                    data: ratings
                })
            })
        }
    },

    css: {
        modules: true,
        // loaderOptions: {
        //     css: {
        //         localIdentName: '[path][name]__[local]--[hash:base64:5]',
        //         camelCase: 'only'
        //     }
        // }
    },

    // 全局默认less变量
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/common/less/resources/global.less')
            ]
        }
    },
    
    configureWebpack: {
        
    }
}
