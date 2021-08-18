const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const config = require('../config/config.json');

const connection = mysql.createConnection({
    host: config.development.host,
    user: config.development.username,
    database: config.development.database,
    password: config.development.password,
});

router.get('/list', (req, res) => {
    const sql = `SELECT User.nickname, Post.deadline, Post.location, Post.min_num, Post.cur_num, Post.title, Post.content, Post.closed FROM Post INNER JOIN User ON Post.writer = User.id`;
    connection.query(sql, function (err, rows) {
        if (err) {
            console.log(err);
        }
        else {
            const resultCode = 200;
            const message = '데이터 불러오기 성공';
            const result = JSON.stringify(rows);
            console.log(result);
            res.status(resultCode).send(resultCode, message, result);
        }
    })
})

router.get('/list:userIdx', (req, res) => {
    const userIdx = req.userIdx;
    const testidx = 1;
    const sql = `SELECT * FROM Post WHERE writer="${testidx}`;
    connection.query(sql, function (err, rows) {
        console.log(rows[0]);
    })
})
module.exports = router;