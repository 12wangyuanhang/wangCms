let database = require('../../database/index.js');

async function handle(ctx, next) {
    if (ctx.request.body) {
        let messageData = await database.getMessage();
        console.log(messageData)
        let json = {
            status: 0,
            result: {
                "currentPage": "1",
                "pageSize": "20",
                "total": messageData.length,
                dataList: messageData
            },
            msg: '获取成功'
        };
        ctx.body = json;
    } else {
        let json = {
            status: 1,
            result: {},
            msg: '获取失败'
        };
        ctx.body = json;
    }
}
module.exports = {
    path: '/api/getData',
    handle
}