const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const config = require('../config/config.json');

const connection = mysql.createConnection({
    host: config.development.host,
    user: config.development.username,
    database: config.development.database,
    password: config.development.password,
});

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