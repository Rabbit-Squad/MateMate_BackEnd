const express = require('express');
const connection = require('../modules/mysql');
const statusCode = require('../modules/status');
const messageCode = require('../modules/message');
const router = express.Router();

router.get('/profile/:userIdx', async (req, res) => {
    const userIdx = req.params.userIdx;

    const sql = `SELECT User.nickname, User.email From User WHERE User.id = ${userIdx}`;

    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(statusCode.NOT_FOUND).json({
                status : statusCode.BAD_REQUEST,
                message : messageCode.REQUEST_FAIL
            })
        }
        else {
            res.status(statusCode.SUCCESS).json({
                status : statusCode.SUCCESS,
                message : messageCode.GET_USER_INFO_SUCCESS,
                nickname : result[0].nickname,
                email : result[0].email,
            })
        }
    })
});

router.delete('/profile/delete/:userIdx', async (req, res) => {
    const userIdx = req.params.userIdx;

    const sql = `DELETE From User WHERE User.id = ${userIdx}`;

    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(statusCode.NOT_FOUND).json({
                status : statusCode.BAD_REQUEST,
                message : messageCode.REQUEST_FAIL
            })
        }
        else {
            res.status(statusCode.SUCCESS).json({
                status : statusCode.SUCCESS,
                message : messageCode.DELETE_USER_SUCCESS,
            })
        }
    })
})

module.exports = router;