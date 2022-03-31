const router = new require('koa-router')()
// 主要还是用router.all来处理每一个接口
let routes = require('./routes/routes.js')
routes.forEach(r => {
    router.all(r.path, r.handle)
})

module.exports = router