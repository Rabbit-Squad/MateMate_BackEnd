const express = require('express');
const path = require('path');
const config = require('./config/config.json');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const { sequelize } = require('./models');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const mysql = require('mysql2');
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express(); 
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express : app,
    watch : true,
});

const connection = mysql.createConnection({
    host : config.development.host,
    user : config.development.username,
    password : config.development.password,
    database : config.development.database
});
connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        /*
        const email = 'abc@abcd.com'
        connection.query(`SELECT * FROM User WHERE email="${email}"`, function (err, rows, fields) {
            if (rows.length > 0) {
                console.log(rows[0].email);
            }
            else {
                console.log('아이디 없음');
            }
        })*/
        console.log('데이터베이스 연결 성공');
    }
});
/*
sequelize.sync({ force : false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });
    */

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session ({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    },
}));

app.use('/', authRouter);
app.use('/', postRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다. `);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})