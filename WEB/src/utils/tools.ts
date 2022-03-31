
class Tools {
    constructor(){

    }

    searchBarToos(item:any) {
        let newItem = Object.assign({},item);
        newItem.code = newItem.searchCode;
        newItem.type = newItem.searchType;
        delete newItem.searchCode
        delete newItem.searchType
        return newItem
    }

    typeCheck(type:any){
        return Object.prototype.toString.call(type);
    }

}

export default new Tools();