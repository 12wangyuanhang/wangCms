import { useRouter } from 'vue-router';

const router = useRouter();

const routerList:any = router.options.routes[1].children;

function handleMenuList(list:object[]){
    const newList:any = list.map((item:any)=>{
        let newItem = {
            index:item.path,
            name:item.name,
            children:item.children.length? handleMenuList(item.children):[],
        }
        return newItem
    })
    return newList
}

export default handleMenuList(routerList);