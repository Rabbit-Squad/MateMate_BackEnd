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
    if (!req.body.userId) {  
        return res.status(statusCode.BAD_REQUEST).send(messageCode.MISS_DATA);
    }

    const {
        userId,
        deadline,
        location,
        min_num,
        title,
        content
    } = req.body;

    if (!userId | !deadline | !location | !min_num | !title | !content) {
        return res.status(statusCode.BAD_REQUEST).json({
            status: statusCode.BAD_REQUEST,
            message: messageCode.POST_FAIL
        });  
    }
    
    const sql = (`INSERT INTO Post (writer, deadline, location, min_num, cur_num, title, content, closed) VALUES (${userId}, '${deadline}', '${location}', ${min_num}, 1, '${title}', '${content}', 0)`);

    connection.query(sql, (err, result) => {
        const resultCode = statusCode.NOT_FOUND;
        const message = messageCode.POST_FAIL;

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