import router from '../router/index';
import { ElLoading } from 'element-plus';

class Tools {
    loading:any = null;
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
    // 打开loading
    openFullScreen(){
        this.loading =  ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })
    }
    // 关闭loading
    closeLoading(){
        if(this.loading){
            this.loading.close();
        }
    }
}

export default new Tools();