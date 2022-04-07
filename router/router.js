const express = require('express');
const router = express.Router();

// 引入 管理中间件模块  
const supervise = require('../controller/Indexcontroller.js')

router.get('/',supervise.index);
router.get('/login',supervise.login);


module.exports = router;
