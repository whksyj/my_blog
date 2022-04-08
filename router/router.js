const express = require('express');
const router = express.Router();

// 引入 管理中间件模块  
const supervise = require('../controller/Indexcontroller.js')
const Cate = require('../controller/Catecontroller.js')

router.get('/',supervise.index);
router.get('/login',supervise.login);
router.get('/catelist',Cate.catelist);

// 分类列表的数据接口
router.get('/cateData', Cate.cateData)

// 编辑分类的接口  
router.post('/updCateData', Cate.updCateData);
// 删除的端口号
router.get('/deleteCateData', Cate.deleteCateData);

module.exports = router;
