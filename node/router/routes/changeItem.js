let database = require('../../database/index.js');

async function handle(ctx, next) {
    let body = ctx.request.body;
    if (body.index !== ''&&body.index !== null&&body.rowData) {
        let messageData = await database.changeData(body.index,body.rowData);
        let json = {
            status: 0,
            result: {},
            msg: '保存成功'
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
    path: '/api/changeItem',
    handle
}