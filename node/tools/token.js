const jwt = require('jsonwebtoken');

exports.verToken = function(token){
    return new Promise((resolve, reject)=>{
        // ,(err,decoded)=>{
        //     if(err){
        //         if(err.name == 'TokenExpiredError'){//token过期
        //             let str = {
        //                 iat:1,
        //                 exp:0,
        //                 msg: 'token过期'
        //             }
        //             return str;
        //         }else if(err.name == 'JsonWebTokenError'){//无效的token
        //             let str = {
        //                 iat:1,
        //                 exp:0,
        //                 msg: '无效的token'
        //             }
        //             return str;
        //         }
        //     }else{
        //         return decoded;
        //     }
        // }
        // 对token进行解密查找
        const info = jwt.verify(token.split(' ')[1],'123456')
        resolve(info)
    })
}