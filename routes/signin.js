const express = require('express');
const router = express.Router();
const connection = require('../modules/mysql');
const statusCode = require('../modules/status');
const messageCode = require('../modules/message');
const jwt = require('jsonwebtoken');

router.post('/signin', (req, res) => {
    const {
        email,
        pw
    } = req.body;
    const sql = `SELECT * FROM User WHERE email="${email}"`;
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            return res.status(statusCode.NOT_FOUND).send(messageCode.REQUEST_FAIL);
        }
        else {
            if (rows.length === 0) {
                return res.status(statusCode.MATCH_ERR).send(messageCode.INVALID_USER);
            }
            
            else if (pw !== rows[0].pw) {
                return res.status(statusCode.MATCH_ERR).send(messageCode.INVALID_PW);
            } 
            else {
                var token = jwt.sign({
                    email: email
                }, process.env.JWT_SECRET);

                //return res.status(statusCode.SUCCESS).send(statusCode.SUCCESS, messageCode.SUCCESS, {userIdx : rows[0].id});
                return res.status(statusCode.SUCCESS).json({
                    code: statusCode.SUCCESS,
                    message: messageCode.SIGN_IN_SUCCESS,
                    token: token
                });                                    
            }
        }
        
    })
})

module.exports = router;