const express = require('express');
const router = express.Router();
const connection = require('../modules/mysql');
const statusCode = require('../modules/status');
const messageCode = require('../modules/message');

router.get('/list', (req, res) => {
    const sql = `SELECT User.nickname, Post.deadline, Post.location, Post.min_num, Post.cur_num, Post.title, Post.content, Post.closed FROM Post INNER JOIN User ON Post.writer = User.id`;
    connection.query(sql, function (err, rows) {
        if (err) {
            console.log(err);
            res.status(statusCode.BAD_REQUEST).send(messageCode.REQUEST_FAIL);
        }
        else {
            const result = JSON.stringify(rows);
            res.status(statusCode.SUCCESS).send(statusCode.SUCCESS, messageCode.SUCCESS, result);
        }
    })
})


router.get('/list/:userIdx', (req, res) => {
    const userIdx = req.params.userIdx;
    console.log(userIdx);
    const sql = `SELECT User.nickname, Post.deadline, Post.location, Post.min_num, Post.cur_num, Post.title, Post.content, Post.closed FROM Post INNER JOIN User ON Post.writer = User.id AND User.id = ${userIdx}`;
    connection.query(sql, function (err, rows) {
        if(err) {
            console.log(err);
            res.status(statusCode.NOT_FOUND).send(messageCode.REQUEST_FAIL);
        } 
        else {
            const result = JSON.stringify(rows);
            res.status(statusCode.SUCCESS).send(statusCode.SUCCESS, messageCode.SUCCESS, result);
        }
    })
})
module.exports = router;