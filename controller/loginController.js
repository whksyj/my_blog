// const { fstat } = require('fs');
let path = require('path');
let md5 = require('md5');
let encryptStr = require('../config/md5config');
// console.log(encryptStr);
let Entry = {};

const PathDir = path.join(path.dirname(__dirname), 'views')
let query = require('../model/query.js')



Entry.login = (req, res) => {
    res.render(`${PathDir}/login.html`);
}

Entry.toLogin = async (req, res) => {
    let { username, password } = req.body
    console.log(username, password);
    password = md5(`${password}${encryptStr}`);
    // console.log(password);
    let userSql = `select * from users`
    let userdata = await query(userSql);
    let data = userdata.find(item => {
        if (item.username == username && item.password == password) {
           req.session.userInfo = item
           res.cookie('userInfo', JSON.stringify(item), {
            expires: new Date(Date.now() + 1 * 3600000),
        })
            return true
        }
    });
    let dataUser = req.session.userInfo;
    // console.log(data);
    if (data) {
        let successData = {
            dataUser,
            status: 2000,
            messgae: '找到数据'
        };
        // res.cookie('username', username)
        // res.cookie('password',password);
        // console.log('1234536',req.session.userInfo);
        res.json(successData);
    }else {
        let failData = {
            status: 20001,
            messgae: '没找到该数据'
        };
        res.json(failData);
    }
 
}

Entry.loginOut = async (req, res) => {
    req.session.destroy(function(err){
        if(err){
              throw err;
        }
    });
    // res.redirect('/login')
    let objdata = {
        massage :'删除数据',
        code:0,
    } 
    res.json(objdata)
}

module.exports = Entry;