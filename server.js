const express = require('express');
const path = require('path');
const  app = express();

// 引用路由模块 router
const router = require('../backend/router/router.js');
console.log(path.join(__dirname,'assets'));
app.use('/assets',express.static(path.join(__dirname,'assets')))
app.use(router);


app.listen(3300,() => {
    console.log('runing port 3300');
})