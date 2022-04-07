const express = require('express');
const  app = express();

// 引用路由模块 router
const router = require('../backend/router/router.js');

app.use(router);


app.listen(3300,() => {
    console.log('runing port 3300');
})