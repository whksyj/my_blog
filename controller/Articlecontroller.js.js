// const { join } = require('path');
const path = require('path');
// const { title } = require('process');
let Cate = {};

// 导入模型
let query = require('../model/query.js')

const PathDir = path.join(path.dirname(__dirname),'views')

let Article = {};

Article.article = (req,res) => {
    res.render(`${PathDir}/article.html`);
}

Article.getData = async (req,res) => {
    let getArticleSql = `SELECT t1.* , t2.cate_name,t3.username FROM article t1 LEFT JOIN category t2 ON t1.cate_id = t2.cate_id LEFT JOIN users t3 on	t1.author = t3.id `;
    let data = await query(getArticleSql);
    let resdata = {
        data,
        code :0,
        massage :'success'
    }
    res.json(resdata);


};

module.exports = Article