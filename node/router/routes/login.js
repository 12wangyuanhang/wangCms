const jwt = require('jsonwebtoken');
const tools = require('../../tools/token.js')
const expireTime = '1h';

async function handle(ctx, next) {
    let params = ctx.request.body;
    const userArray = ['12345678', '666666']
    const passArray = ['123456', '666666']
    if (params.passWord && params.userName) {
        let json = {
            status: 0,
            result: {},
            msg: '登陆成功'
        };
        if(passArray.includes(params.passWord)&&userArray.includes(params.userName)){
            //对token进行加密响应个客户端（参数1：传值规则；参数2：加密规则; 参数3：定义时间）
            let token = jwt.sign({
                userName:params.userName,
                passWord:params.passWord
            },'123456',{expiresIn:expireTime})
            json = {
                status: 0,
                result: {
                    token:token,
                    userName:params.userName,
                    loginTime: new Date().getTime(),
                },
                msg: '登陆成功'
            }
        }else{
            json = {
                status: 1,
                result: {},
                msg: '登陆失败,账号或密码错误'
            }
        }
        ctx.body = json;
    } else {
        let json = {
            status: 1,
            result: {},
            msg: '登陆失败，请输入用户名或者密码'
        };
        ctx.body = json;
    }
}
module.exports = {
    path: '/api/login',
    handle
}