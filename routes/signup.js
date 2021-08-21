const express = require('express');
const router = express.Router();
const connection = require('../modules/mysql');
const statusCode = require('../modules/status');
const messageCode = require('../modules/message');

//회원가입
router.post('/join', async (req, res) => {
    const { nickname, email, pw } = req.body;
    console.log(`${nickname}, ${email}, ${pw}`);
    // 삽입 수행
    const sql = `INSERT INTO User (nickname, email, pw) VALUES ('${nickname}', '${email}', '${pw}')`;    
    
    connection.query(sql, function (err, result) {        
        var resultCode = statusCode.NOT_FOUND;
        var message = messageCode.SIGN_UP_FAIL;

        if (err) {
            console.log(err.message);
        } else {
            resultCode = statusCode.SUCCESS;
            message = messageCode.SIGN_UP_SUCCESS;
        }

        res.status(resultCode).send(message);
    });  
});

module.exports = router;