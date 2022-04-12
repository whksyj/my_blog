const express = require('express');
const multer  = require('multer')
const cookie = require('cookie')
const upload = multer({ dest: 'uploads/' })
const router = express.Router();

// 引入 管理中间件模块  
const supervise = require('../controller/Indexcontroller.js')
const Cate = require('../controller/Catecontroller.js')
const Article = require('../controller/Articlecontroller.js')
const Entry = require('../controller/loginController.js')

// 首页
router.get('/index',supervise.index);
router.get('/getGoodsData',supervise.getGoodsData);
// 修改信息
router.post('/updateUser',upload.single('file'),supervise.updateUser);
router.post('/updateUserInfo',supervise.updateUserInfo);


// 登录页面
router.get('/login',Entry.login);
router.post('/toLogin',Entry.toLogin);
router.post('/loginOut',Entry.loginOut);




// 读取列表文件
router.get('/catelist',Cate.catelist);
// 分类列表的数据接口
router.get('/cateData', Cate.cateData)
// 编辑分类的接口  
router.post('/updCateData', Cate.updCateData);
// 删除的端口号
router.get('/deleteCateData', Cate.deleteCateData);
// 添加端口号 
router.post('/addCateData',Cate.addCateData)
// 获取系统的设置文本
router.get('/headText',Cate.headText);

// 文章页面
router.get('/article',Article.article);
router.get('/getData',Article.getData);


module.exports = router;
