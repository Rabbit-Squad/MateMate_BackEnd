const express = require('express');
const router = express.Router();
const connection = require('../modules/mysql');

//token 처리도 알아바야함..

router.post('/post', async (req, res)  => {
    console.log(req.body);

    if (!req.body.userId) {
        return res.status(400).send("유저 정보 없음"); //에러        
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
        var resultCode = 404;
        var message = '게시물 작성 오류';

        if (!err) {
            resultCode = 200;
            message = '게시물 작성 성공';
        }

        res.status(resultCode).send(message);
    });
    
});

module.exports = router;