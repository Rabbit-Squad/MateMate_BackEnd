const express = require('express');
const router = express.Router();
const connection = require('../modules/mysql');
const statusCode = require('../modules/status');
const messageCode = require('../modules/message');
const message = require('../modules/message');
const approvalRouter = require('./approval');

//요청 승인
router.post('/approval/:reqIdx', approvalRouter);

router.post('/post', async (req, res)  => {
    const {
        userId,
        deadline, //YY-MM-DD hh:mm:ss 포맷으로 전달
        location,
        min_num,
        title,
        content
    } = req.body;

    if (!userId | !deadline | !location | !min_num | !title | !content | !req.body.userId)  {
        return res.status(statusCode.BAD_REQUEST).json({
            status: statusCode.BAD_REQUEST,
            message: messageCode.MISS_DATA
        });  
    }

    const currentDate = new Date();
    const deadlineDate = new Date(deadline); //deadline이 현재로부터 5분 ~ 60분(1시간) 사이의 미래인가? 
    const between = Math.floor((deadlineDate.getTime() - currentDate.getTime()) / 1000 / 60);
    
    if (between < 5 || between > 60) {
        return res.status(statusCode.BAD_REQUEST).json({
            status: statusCode.BAD_REQUEST,
            message: messageCode.INVALID_DATE
        });  
    } // 과거, 글 작성 시점보다 5분 이내의 미래, 60분넘는 미래인 경우엔 모임시간 지정 불가능.
    
    const sql = (`INSERT INTO Post (writer, deadline, location, min_num, cur_num, title, content, closed) VALUES (${userId}, '${deadline}', '${location}', ${min_num}, 1, '${title}', '${content}', 0)`);
    connection.query(sql, (err, result) => {
        let resultCode = statusCode.NOT_FOUND;
        let message = messageCode.POST_FAIL;

        if (!err) {
            resultCode = statusCode.SUCCESS;
            message = messageCode.POST_SUCCESS;
        }

        return res.status(resultCode).json({
            status: resultCode,
            message: message
        });    
    });
    
});

module.exports = router;