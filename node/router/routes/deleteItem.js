let database = require('../../database/index.js');

async function handle(ctx, next) {
    let body = ctx.request.body;
    if (body.index !== undefined||body.index !== null||body.index !== '') {
        let messageData = await database.deleteData(body.index);
        let json = {
            status: 0,
            result: {},
            msg: '删除成功'
        };
        ctx.body = json;
    } else {
        let json = {
            status: 1,
            result: {},
            msg: '请求失败'
        };
        ctx.body = json;
    }
}
module.exports = {
    path: '/api/deleteItem',
    handle
}