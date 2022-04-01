let database = require('../../database/index.js');

async function handle(ctx, next) {
    let params = ctx.request.body;
    
    if (params.currentPage && params.pageSize) {
        let messageData = await database.getMessage();
        let resolveData = []
        if(params.pageSize*params.currentPage >= messageData.length){
            resolveData = messageData.slice(params.pageSize*(params.currentPage-1),messageData.length)
        }else{
            resolveData = messageData.slice(params.pageSize*(params.currentPage-1),params.pageSize*params.currentPage)
        }
        let json = {
            status: 0,
            result: {
                currentPage: params.currentPage,
                pageSize: params.pageSize,
                total: messageData.length,
                dataList: resolveData
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