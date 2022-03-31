let dataList = [
    { id: 10001, name: 'Te222222222st1', nickname: 'T1', role: 'Develo333333333333333333333333333p', sex: '1', age: 28, address: 'Sh33333333333333333333333333333enzhen' },
    { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '0', age: 22, address: 'Guan3333333333333333333333333333gzhou' },
    { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', age: 23, address: 'Shenzhen' },
    { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
    { id: 10006, name: 'Test6', nickname: 'T6', role: 'Develop', sex: '0', age: 27, address: 'Shanghai' },
    { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '1', age: 29, address: 'Shenzhen' },
    { id: 1232, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
    { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
    { id: 1000444, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
    { id: 1000555, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
    { id: 10006666, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
    { id: 1000777, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
    { id: 10008888, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
    { id: 1000999, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
    { id: 1000122, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
    { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: '1', age: 30, address: 'Shenzhen' },
    { id: 1000323, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
    { id: 10010, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
    { id: 10003451, name: 'Test123', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
    { id: 10012, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shan22222222222222222222222222222ghai' }
]

async function addMessage(msg) {
    dataList.unshift(msg);
    return dataList
}

async function getMessage() {
    return dataList;
}

async function deleteData(index) {
    dataList.splice(index, 1);
    return dataList
}
async function changeData(index, item) {
    for (let name in dataList[index]) {
        dataList[index][name] = item[name]
    }
    return dataList
}
module.exports = {
    addMessage,
    getMessage,
    deleteData,
    changeData
}