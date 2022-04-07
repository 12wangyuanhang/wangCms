import router from '../router/index'
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
    doLogout(){
        router.push('/login')
        localStorage.removeItem('token');
    }
}

export default new Tools();