
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

}

export default new Tools();