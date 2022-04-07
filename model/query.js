const mysql = require('mysql');

const dbconfig = require('../config/dbconfig.js');

let connection = mysql.createConnection(dbconfig);
// 连接 mysql 
connection.connect(function (err) {
    if(err) throw err;
    console.log('mysql success');
});

// 封装一个 query 方法
function query (sql) {
    return new Promise((resolve,reject) => {
        connection.query(sql,(err,result) => {
            if(err) reject(err);
            resolve(result)
        })
    })
};

module.exports = query;