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

    const time = arrive_time.split(':');
    if (time[1] > 50 || time[1] < 1) {
        return res.status(statusCode.BAD_REQUEST).json({ 
            code: statusCode.BAD_REQUEST,
            message: messageCode.INVALID_DATE
        }); 
    }

    const secondSql = `SELECT distinct Post.id FROM Post, Request WHERE Post.writer = ${userId} or Post.closed = 1 UNION SELECT Request.post FROM Request where Request.requester = ${userId};`//내 글, 마감된 글, 이미 신청한 글 
    connection.query(secondSql, (error, result) => {
        console.log(result.length);
        const resultArray = new Array(result.length);
        for(let i = 0; i<result.length; i++) {
            resultArray[i] = result[i].id // 작성이 불가한 post.id를 가져와서 resultArray에 저장
        }
        if(!error) {
            if (resultArray.includes(Number(req.params.postIdx)) === true) {
                return res.status(statusCode.BAD_REQUEST).json({ 
                    code: statusCode.BAD_REQUEST,
                    message: messageCode.INVALID_REQUEST
                }); // 마감, 이미 신청한 글, 내 글인 경우 신청 불가
            }
            else { // 신청 가능한 글인 경우 
                const sql = `INSERT INTO Request (requester, content, arrive_time, post, approval) SELECT ${userId}, '${content}', '${arrive_time}', ${req.params.postIdx}, 0 from dual;`
                connection.query(sql, (error, result) => {
                    if(!error) {
                        return res.status(statusCode.SUCCESS).json({
                            code: statusCode.SUCCESS,
                            message: messageCode.REQUEST_SUCCESS
                        }); //정상 처리
                    } 
                    else {
                        return res.status(statusCode.BAD_REQUEST).json({
                            code: statusCode.BAD_REQUEST,
                            message: messageCode.REQUEST_FAIL
                        }); //에러 발생
                    }
                })
            }
        } 
        else { //첫 번째 쿼리부터 실패. 
            return res.status(statusCode.BAD_REQUEST).json({
                code: statusCode.BAD_REQUEST,
                message: messageCode.REQUEST_FAIL
            });
        }
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