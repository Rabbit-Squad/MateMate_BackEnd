const express = require('express');
const router = express.Router();
const connection = require('../modules/mysql');
const statusCode = require('../modules/status');
const messageCode = require('../modules/message');

/*
    보내진 Request의 승인여부를 서버에 보냄
    1. 리퀘스트 approval을 바꿈
    2. 해당 Post의 cur_num++
*/

router.post('/approval/:reqIdx', async (req, res) => {
    const {        
        approval,
    } = req.body;

    const id = req.params.reqIdx;
    
    let sql;    
    //Request의 Approval을 업데이트
    sql = `UPDATE Request SET approval=${approval} WHERE Request.id = ${id}`;
    
    if (approval === 1) //1인 경우가 승인
    {
        sql += `; UPDATE Post P INNER JOIN Request R on P.id = R.post SET P.cur_num = cur_num + 1`;
    }
    
    connection.query(sql, (err, result) => {
        if (!err) {
            return res.status(statusCode.SUCCESS).json({
                status : statusCode.SUCCESS,
                message : messageCode.APPROVAL_SUCCESS
            })
        } 
        else {
            return res.status(statusCode.BAD_REQUEST).json({
                status: statusCode.BAD_REQUEST,
                message: messageCode.APPROVAL_FAIL
            });
        }
    }); 
});

module.exports = router;