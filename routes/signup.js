const express = require('express');
const router = express.Router();
const connection = require('../modules/mysql');

//회원가입
router.post('/join', async (req, res) => {
    const { nickname, email, pw } = req.body;
    console.log(`${nickname}, ${email}, ${pw}`);
    // 삽입 수행
    const sql = `INSERT INTO User (nickname, email, pw) VALUES ('${nickname}', '${email}', '${pw}')`;    
    
    connection.query(sql, function (err, result) {        
        var resultCode = 404;
        var message = '회원가입 오류';

        if (err) {
            console.log(err.message);
        } else {
            resultCode = 200;
            message = '회원가입 성공';
        }

        res.status(resultCode).send(message);
    });  
});

module.exports = router;