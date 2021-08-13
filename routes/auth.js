const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const router = express.Router();

//로그인 { email, pw }
router.post('/login', (req, res, next) => {
    const { email, pw } = req.body;

    //정보를 입력하지 않음
    if (!email || !pw) {
        return res.status(422).send('Enter both email and password.');
    }
});