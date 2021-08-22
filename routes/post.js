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
    console.log(req.body);

    if (!req.body.userId) {
        //return res.status(400).send("유저 정보 없음"); //에러    
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

    const sql = (`INSERT INTO Post (writer, deadline, location, min_num, cur_num, title, content, closed) VALUES (${userId}, '${deadline}', '${location}', ${min_num}, 1, '${title}', '${content}', 0)`);

    connection.query(sql, (err, result) => {
        var resultCode = statusCode.NOT_FOUND;
        var message = messageCode.POST_FAIL;

        if (!err) {
            resultCode = statusCode.SUCCESS;
            message = messageCode.POST_SUCCESS;
        }

        res.status(resultCode).send(message);
    });
    
});

module.exports = router;