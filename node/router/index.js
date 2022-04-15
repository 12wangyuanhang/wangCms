const router = new require('koa-router')()
const jwt = require('jsonwebtoken');
const tools = require('../tools/token.js')
// 主要还是用router.all来处理每一个接口
let routes = require('./routes/routes.js')
// 白名单
let whiteList = ['/api/login'];
routes.forEach(r => {
    if(whiteList.includes(r.path)){
        router.all(r.path, r.handle)
    } else {
        router.all(r.path, async (ctx,next)=>{
            const token = ctx.headers.token;
            if(token){
                try{
                    const result = await tools.verToken(token)
                    // console.log(result,9000)
                    return r.handle(ctx, next)
                }catch(err){
                    ctx.status = 401;
                    return ctx.body = {
                        status: 1,
                        msg:'登陆过期，请从新登陆'
                    }
                }
            } else {
                ctx.status = 401;
                return ctx.body = {
                    status: 1,
                    msg:'登陆过期，请从新登陆'
                }
            }
        })
    }
})
module.exports = router