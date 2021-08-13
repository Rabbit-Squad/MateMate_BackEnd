const express = require('express');
const path = require('path');
const config = require('./config/config.json');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const { sequelize } = require('./models');
const { runInNewContext } = require('vm');
const mysql = require('mysql2');
const { rootCertificates } = require('tls');


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
        connection.query("SELECT * FROM User", function (err, rows, fields) {
            console.log(rows);
        })
    }
});

sequelize.sync({ force : false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다. `);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.localse.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})