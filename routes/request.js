const express = require('express');
const connection = require('../modules/mysql');
const statusCode = require('../modules/status');
const messageCode = require('../modules/message');
const router = express.Router();

router.post('/request/:postIdx', async (req, res) => {
    const {
        userId,
        content,
        arrive_time,
    } = req.body; 
    const sql = `INSERT INTO Request (requester, content, arrive_time, post, approval) SELECT ${userId}, '${content}', '${arrive_time}', ${req.params.postIdx}, 0 from dual 
    where not exists (SELECT * FROM Post, Request WHERE Request.requester = ${userId} and Post.id = ${req.params.postIdx})`;
    connection.query(sql, (error, result) => {
        let status = statusCode.BAD_REQUEST;
        let message = messageCode.REQUEST_FAIL;
        if(!error) {
            status = statusCode.SUCCESS;
            message = statusCode.REQUEST_SUCCESS;
        }
        return res.status(status).json({
            code: status,
            message: message
        });
    })
})

//내 게시글 신청자 조회
router.get('/request/mypost/:userIdx', async (req, res) => {
    const sql = `SELECT Post.title, User.nickname, Request.id, Request.content, Request.arrive_time FROM Request INNER JOIN Post ON Post.id = Request.post AND Post.writer = ${req.params.userIdx} JOIN User ON User.id = Request.requester`;
    connection.query(sql, (error, result) => {
        let status = statusCode.NOT_FOUND;
        let message = messageCode.LIST_FAIL;
        if(!error) {
            status = statusCode.SUCCESS;
            message = messageCode.LIST_SUCCESS;
        }
        return res.status(status).json({
            code : status,
            message : message,
            data : result
        })
    })
})
module.exports = router;