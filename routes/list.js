const express = require('express');
const router = express.Router();
const connection = require('../modules/mysql');
const statusCode = require('../modules/status');
const messageCode = require('../modules/message');

router.get('/list', (req, res) => {
    const sql = `SELECT User.nickname, Post.id, Post.deadline, Post.location, Post.min_num, Post.cur_num, Post.title, Post.content, Post.closed FROM Post INNER JOIN User ON Post.writer = User.id`;
    connection.query(sql, function (err, rows) {
        if (err) {
            console.log(err);
            res.status(statusCode.BAD_REQUEST).json({
                status : statusCode.BAD_REQUEST,
                message : messageCode.LIST_FAIL
            })
        }
        else {
            res.status(statusCode.SUCCESS).json({
                status : statusCode.SUCCESS,
                message : messageCode.LIST_SUCCESS,
                data : rows
            })
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
            res.status(statusCode.NOT_FOUND).json({
                status : statusCode.BAD_REQUEST,
                message : messageCode.LIST_FAIL
            })
        } 
        else {
            res.status(statusCode.SUCCESS).json({
                status : statusCode.SUCCESS,
                message : messageCode.LIST_SUCCESS,
                data : rows
            });
        }
    })
})
module.exports = router;