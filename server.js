const express = require('express');
const path = require('path');
// 引入模板引擎
const artTemplate = require('art-template'); 
const express_template = require('express-art-template');
const  app = express();

// 配置模板引擎
//配置模板的路径
app.set('views', __dirname + '/views/');
//设置express_template模板后缀为.html的文件(不设这句话，模板文件的后缀默认是.art)
app.engine('html', express_template);
//设置视图引擎为上面的html
app.set('view engine', 'html');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 引用路由模块 router
const router = require('./router/router.js');
app.use('/assets',express.static(path.join(__dirname,'assets')))
app.use(router);


app.listen(3300,() => {
    console.log('runing port 3300');
})