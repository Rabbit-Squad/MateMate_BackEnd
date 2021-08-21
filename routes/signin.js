const express = require('express');
const router = express.Router();
const connection = require('../modules/mysql');
const statusCode = require('../modules/status');
const messageCode = require('../modules/message');

router.get('/signin', (req, res) => {
    const {
        email,
        pw
    } = req.body;
    const sql = `SELECT * FROM User WHERE email="${email}"`;
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(statusCode.BAD_REQUEST).send(messageCode.REQUEST_FAIL);
        }
        else {
            if (rows.length === 0) {
                res.status(statusCode.MATCH_ERR).send(messageCode.INVALID_USER);
            }
            
            else if (pw !== rows[0].pw) {
                res.status(statusCode.MATCH_ERR).send(messageCode.INVALID_PW);
            } 
            else {
                res.status(statusCode.SUCCESS).send(statusCode.SUCCESS, messageCode.SUCCESS, {userIdx : rows[0].id});
            }
        }
        
    })
})

module.exports = router;