const http = require('http');
const fs = require('fs');
const url = require('url');

// 引入轮播图数据
const slideData = require('./sliders');

// 定义每次加载数据的条数
const pageSize = 12;

// 定义读取game的方法
function readGame(cb) {
    fs.readFile('./games.json', 'utf-8', function (err, data) {
        if(err || data.length == 0){
            cb([]);
        }else{
            cb(JSON.parse(data));
        }
    });
}

// 创建服务
http.createServer((req, res) => {
    // 跨域请求表头配置
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By", ' 3.2.1');
    if(req.method === 'OPTIONS') return res.end(); // 让options请求快速返回

    let {pathname, query} = url.parse(req.url, true); // true：把query转成对象

    // 读取轮播图
    if(pathname === '/slider'){
        res.setHeader('Content-type', 'application/json;charset=utf-8');
        res.end(JSON.stringify(slideData));
    }

    // 通过栏目取得对应的所有游戏
    if(pathname === '/game'){
        let gameCategory = query.category; // 取得游戏类别
        if(gameCategory){
            if(req.method === 'GET'){
                readGame(function (games) {
                    let gameList = games.find(item => item.category === gameCategory);
                    res.setHeader('Content-type', 'application/json;charset=utf-8');
                    res.end(JSON.stringify(gameList.list));
                });
            }
        }else{
            readGame(function (games) {
                res.setHeader('Content-type', 'application/json;charset=utf-8');
                res.end(JSON.stringify(games));
            });
        }
    }

    // 通过id找到对应的某个游戏
    if(pathname === '/detail'){
        let gameCategory = query.category;
        let id = parseInt(query.id);

        if(gameCategory){
            if(req.method === 'GET'){
                readGame(function (games) {
                    let gameList = games.find(item => item.category === gameCategory);
                    let someGame = (gameList.list).find(val => val.id === id);
                    res.setHeader('Content-type', 'application/json;charset=utf-8');
                    res.end(JSON.stringify(someGame));
                });
            }
        }
    }

    // 每次读取`pageSize`条数据
    if(pathname === '/page'){
        let offset = parseInt(query.offset) || 0;
        let gameCategory = query.category;
        readGame(function (games) {
            let gameList = games.find(item => item.category === gameCategory);
            // 每次在偏移量`offset`的基础上加`pageSize`条
            let result = gameList.list.slice(offset, offset + pageSize);
            let hasMore = true; // 默认有加载更多

            // 如果加载条数大于总条数
            if(offset + pageSize >= gameList.list.length){
                hasMore = false;
            }
            res.setHeader('Content-type', 'application/json;charset=utf-8');
            res.end(JSON.stringify({hasMore, games: result}));
        });
        return;
    }

}).listen(3200);