const express = require('express');
const router = express.Router();
const config = require('../config/config.json');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host : config.development.host,
    user : config.development.username,
    password : config.development.password,
    database : config.development.database
});

router.get('/signin', (req, res) => {
    const {
        email,
        pw
    } = req.body;
    const testtemp = 'abc@abc.com';
    const testpw = 'aaad'
    const sql = `SELECT * FROM User WHERE email="${testtemp}"`;
    connection.query(sql, function (err, rows, fields) {
        var resultCode = 404;
        var message = '에러 발생';
        if (err) {
            console.log(err);
        }
        else {
            if (rows.length === 0) {
                resultCode = 204;
                message = '존재하지 않는 아이디입니다. ';
                console.log(message);
                res.status(resultCode).send(message);
            }
            
            else if (testpw !== rows[0].pw) {
                resultCode = 204;
                message = '잘못된 비밀번호 입니다. ';
                console.log(message);
                res.status(resultCode).send(message);
            } 
            else {
                resultCode = 200;
                message = '로그인 성공';
                res.status(resultCode).send(resultCode, message, {userIdx : rows[0].id});
            }
        }
        
    })
})

module.exports = router;