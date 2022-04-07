const Koa = require("koa");
// koa.js并没有内置Request Body的解析器，当我们需要解析请求体时需要加载额外的中间件，
// 官方提供的koa-bodyparser是个很不错的选择，支持x-www-form-urlencoded, application/json等格式的请求体，
// 但不支持form-data的请求体，需要借助 formidable 这个库，也可以直接使用 koa-body 或 koa-better-body
const koaBody = require("koa-body");
// const koaBody = require("koa-bodyparser");
// Node.js除了处理动态请求，也可以用作类似Nginx的静态文件服务，在本地开发时特别方便，
// 可用于加载前端文件或后端Fake数据，可结合 koa-compress 和 koa-mount 使用
const serve = require('koa-static');
// const views = require('koa-views')
const cors = require("koa-cors");
// 自行创建文件
const koaJwt = require('koa-jwt')
// const response = require('./response.js');
const httpPort = require("./config");
let router = require('./router/index.js');
var appName = "zymb";
if (process.env.debug) {
    appName = process.env.debug;
}
var debug = require("debug")(appName);
const app = new Koa();

// app.use(serve("F:/vue3.0/demo", { index: "login.html" }));
// app.use(views(__dirname + '/views', {
//     extension: 'pug'
// }))
app.use(koaBody({
    multipart: true, // 是否支持 multipart-formdate 的表单
    urlencoded: true,
}))


app.use(cors());
// app.use(koaBody());
app.use(router.routes());
app.use(async (ctx,next)=>{
    return next().catch((err)=>{
        if(err.status === 401){
            ctx.status = 401;
            ctx.body = {
                status:1,
                msg:'登录过期，请重新登录'
            }
        } else {
            throw err;
        }
    })
})
app.use(koaJwt({
    secret:'123456'
}).unless({
    path:[/^\/api\/login/]
}))
app.listen(httpPort.httpPort, () => {
    console.log('server is running localhost:' + httpPort.httpPort);
});