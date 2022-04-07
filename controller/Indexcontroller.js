const path = require('path');
let supervise = {};

// 导入模型
let query = require('../model/query.js')

const PathDir = path.join(path.dirname(__dirname),'views')

supervise.index = (req,res) => {
    res.sendFile(`${PathDir}/index.html`)
}
supervise.login = (req,res) =>{
    res.sendFile(`${PathDir}/login.html`)
}


module.exports = supervise;