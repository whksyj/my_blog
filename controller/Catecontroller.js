// const { join } = require('path');
const path = require('path');
// const { title } = require('process');
let Cate = {};

// 导入模型
let query = require('../model/query.js')

const PathDir = path.join(path.dirname(__dirname),'views')

Cate.catelist = (req,res) => {
    res.render(`${PathDir}/catelist.html`);
}

// 返回数据的接口
Cate.cateData = async (req,res) => {
    let sql = 'SELECT * FROM category' // 查询语句
    let data = await query(sql);
    let resdata = {
        data,
        code :0,
        massage :'success'
    }
    
    res.json(resdata);
};
// 数据更改接口
Cate.updCateData = async (req,res) => {
    // 结构对象
    let {
        cate_id,
        cate_name,
        orderBy
    } = req.body;
    // update 表名 set 字段名1 = 值1,字段名2 = 值2,字段名n = 值n where 字段名 = 值
    // let updatesql = `UPDATE article SET title = ${title},content = ${content},author = ${author}, pic = ${pic}
    // where id = ${cate_id}`// 查询语句
    console.log(cate_id,cate_name,orderBy);
    let updatesql = `UPDATE category SET cate_name = '${cate_name}', orderBy = ${orderBy}
        where cate_id = ${cate_id}`// 查询语句
    
    // 解构 后印象的行数
    let{affectedRows} = await query(updatesql);
    let successData = {
        code:1,
        messgae:'uodate success'
    };
    let failDate = {
        code:0,
        message :'update fail'
    }

    if(affectedRows > 0){
        res.json(successData)
    }else {
        res.json(failDate)
    }


};


Cate.deleteCateData = async (req,res) => {
    let {cate_id} = req.query
    console.log(cate_id);
    // update 表名 set 字段名1 = 值1,字段名2 = 值2,字段名n = 值n where 字段名 = 值
    let updatesql = `delete from category where cate_id = ${cate_id}` // 查询语句
    let rows = await query(updatesql);
    res.json(rows);
};

Cate.addCateData = async (req,res) => {
    let {cate_name, orderBy} = req.body;
    console.log(orderBy,cate_name);
    let addSql = `insert into category(cate_id,cate_name,orderBy) values(null,'${cate_name}',${orderBy})`;

    let rows = await query(addSql);
    console.log(rows);

    let successData = {
        status:2000,
        messgae:'addData success'
    };
    let failDate = {
        status:2003,
        message :'addData fail'
    }

  
    let {affectedRows} = rows;
    if( affectedRows > 0) {
        res.send(successData)
    }else{
        res.send(failDate)
    }
}

Cate.headText = async (req,res) => {
    let haedTxteSql = `select * from system`;

    let rows = await query(haedTxteSql);
    console.log(rows);
    
    res.json(rows)
}

module.exports = Cate;