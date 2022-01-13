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
    const deadlineDate = new Date(deadline); //deadline이 현재로부터 24시간 이내의 미래인가? 
    const between = Math.floor((deadlineDate.getTime() - currentDate.getTime()) / 1000 / 60 / 60);
    
    if (between >= 24 || between < 0) {
        return res.status(statusCode.BAD_REQUEST).json({
            status: statusCode.BAD_REQUEST,
            message: messageCode.INVALID_DATE
        });  
    } //과거나 24시간 이상의 미래가 나온 경우 
    
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