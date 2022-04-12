const path = require('path');
let fs = require('fs')
let supervise = {};

// 导入模型
let query = require('../model/query.js')

const PathDir = path.join(path.dirname(__dirname), 'views/');
supervise.index = (req, res) => {
    res.render(`${PathDir}index.html`)
};


supervise.getGoodsData = async (req, res) => {

    let sql = 'select * from blog_goods';
    let result = await query(sql);
    res.json(result)
};




// 上传图片的
supervise.updateUser = async (req, res) => {

    if (req.file) {
        // 进行文件的重命名即可 fs.rename
        let { originalname, destination, filename } = req.file;
        let dotIndex = originalname.lastIndexOf('.');
        let ext = originalname.substring(dotIndex);
        let oldPath = `${destination}${filename}`;
        let newPath = `${destination}${filename}${ext}`;
        let { id } = req.session.userInfo
        let sql = `UPDATE users set pic='${newPath}' WHERE id = ${id}`;
        let { affectedRows } = await query(sql);
        let data = req.session.userInfo;
        res.cookie('userInfo', JSON.stringify(data), {
            expires: new Date(Date.now() + 1 * 3600000),
        });
        fs.rename(oldPath, newPath, err => {
            if (err) { throw err; }
        });
        // 旧的文件路径
        let auldPath = req.session.userInfo.pic;
        // 添加前缀的绝对路径
        auldPath = path.join(path.dirname(__dirname),auldPath);
        if (affectedRows > 0) {
            let sql2 = `select * from users where id = ${id}`;
            let result = await query(sql2)
            req.session.userInfo = result[0];
            res.cookie('userInfo',JSON.stringify(result[0]),{
                expires: new Date( Date.now() + 1 * 36000000),
            });
            console.log('新的',req.session.userInfo.pic)
            console.log('旧的',auldPath);
            fs.unlink(auldPath,(err) => {
                if(err) throw err
                console.log('删除成功');
            });

        // console.log('更新',req.session.userInfo)
            res.json({ code:0, message: '上传文件成功', 'path': newPath, data })
        }else {
              res.json({ code:99, message: '上传文件成功', 'path': newPath, data })
        }
    };

}

// 编辑文本的
supervise.updateUserInfo = async (req, res) => {
    let { info } = req.body;
    if (info) {
        let data = req.session.userInfo
        let {id} = data;
        let sqlInfo = `UPDATE users set info='${info}' WHERE id = ${id}`;
        let { affectedRows } = await query(sqlInfo);
       
        if (affectedRows > 0) {
            // 同步信息到 cookie 或者 session 中
            const sql = `select * from users where id = ${id}`
            const result = await query(sql);
            req.session.userInfo = result[0];
            res.cookie('userInfo', JSON.stringify(result[0]), {
                expires: new Date(Date.now() + 1 * 3600000),
            });
            res.json({ message: 'info更新成功', data });
        }else {
            res.json({ message: '更新失败', data });
        }
    }
}

module.exports = supervise;