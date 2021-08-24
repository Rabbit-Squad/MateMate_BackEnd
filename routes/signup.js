const express = require('express');
const router = express.Router();
const connection = require('../modules/mysql');
const statusCode = require('../modules/status');
const messageCode = require('../modules/message');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//회원가입
router.post('/join', async (req, res) => {
    const { nickname, email, pw } = req.body;
    const hash = await bcrypt.hash(pw, 12);
    // 삽입 수행
    const sql = `INSERT INTO User (nickname, email, pw) VALUES ('${nickname}', '${email}', '${hash}')`;    
    
    connection.query(sql, function (err, result) {        
        var resultCode = statusCode.NOT_FOUND;
        var message = messageCode.SIGN_UP_FAIL;

        if (err) {
            console.log(err.message);
            return res.status(resultCode).send(message);
        } else {
            resultCode = statusCode.SUCCESS;
            message = messageCode.SIGN_UP_SUCCESS;

            var token = jwt.sign({
                email: email
            }, process.env.JWT_SECRET);
        }        

        return res.status(resultCode).json({
            code: resultCode,
            message: message,
            token: token
        });
    });  
});

module.exports = router;