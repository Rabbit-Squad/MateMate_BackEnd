const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const router = express.Router();
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const listRouter = require('./list');
const requestRouter = require('./request');
const profileRouter = require('./profile');

//로그인 { email, pw }
router.post('/login', (req, res, next) => {
    const { email, pw } = req.body;

    //정보를 입력하지 않음
    if (!email || !pw) {
        return res.status(422).send('Enter both email and password.');
    }
});

//회원가입
router.post('/join', signupRouter);

//로그인 
router.post('/signin', signinRouter);

//목록 가져오기
router.get('/list', listRouter);
router.get('/list/:userIdx', listRouter);

router.post('/request/:postIdx', requestRouter);
router.get('/request/mypost/:userIdx', requestRouter);

router.get('/profile/:userIdx', profileRouter);
router.delete('/profile/delete/:userIdx', profileRouter); 
module.exports = router;