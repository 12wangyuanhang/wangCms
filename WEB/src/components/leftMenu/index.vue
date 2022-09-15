<script lang="tsx">
    import { defineComponent, ref, watch, resolveComponent, h, reactive } from 'vue';
    import {
        Location,
        Document,
        Menu as IconMenu,
        Setting,
    } from '@element-plus/icons-vue';
    import { useRouter } from 'vue-router';
    import menuList from './setMenu';
    export default defineComponent({
        components:{
            Location,
            Document,
            IconMenu,
            Setting,
        },
        setup(){
            const router = useRouter();
            const routerList:any = router.options.routes[1].children;
            const refData = ref(null);

            function handleMenuList(list:object[],parentPath:string){
                const newList:any = list.map((item:any)=>{
                    let path = '';
                    if(parentPath){
                        path = parentPath + '/' + item.path;
                    } else {
                        if(/(\/home)/g.test(item.path)){
                            path = item.path;
                        }else{
                            path = '/home/'+item.path;
                        }
                    }
                    let newItem = {
                        path:path,
                        name:item.name,
                        meta:item.meta??{},
                        children:item.children?.length? handleMenuList(item.children, path):[],
                    }
                    return newItem
                })
                return newList
            }
            const menuList = handleMenuList(routerList,'');
            console.log(menuList, 87665)
            const height = document.documentElement.clientHeight - 60;
            const isCollapse = ref(false)
            const handleOpen = (key: string) => {
                router.push(key);
            }
            const handleClose = (key: string, keyPath: string[]) => {
                console.log(key, keyPath)
            }
            // const titleSlot1 = {
            //     title:()=>(
            //         <>
            //             <el-icon><Location /></el-icon>
            //             <span>Navigator One</span>
            //         </>
            //     )
            // }
            const titleSlot6 = {
                title:()=>(
                    <>
                        <span>Navigator Four</span>
                    </>
                )
            }
            const subMenuTitle = (item:any) => {
                return {
                    title:()=>(
                        <>
                            <el-icon>{handleIcon(item.meta?.icon??'')}</el-icon>
                            <span>{item.name}</span>
                        </>
                    )
                }
            }
            const handleIcon = (icon:string) => {
                if(icon){
                    return (h(resolveComponent(icon)))
                } else {
                    return (<Setting></Setting>)
                }
            }
            const handleMenuDom = ()=>{
                return menuList.map((item:any)=>{
                    if(item.children.length){
                        return (
                            <>
                                <el-sub-menu   index={item.path} v-slots={subMenuTitle(item)}>
                                        {
                                            item.children.map((childItem:any)=>{
                                                return (
                                                    <>
                                                        <el-menu-item onClick={()=>handleOpen(childItem.path)} index={childItem.path} v-slots={subMenuTitle(childItem)}>
                                                        </el-menu-item>
                                                    </>
                                                )
                                            })
                                        }
                                </el-sub-menu>
                            </>
                        )
                    } else {
                        return (
                            <>
                                <el-menu-item onClick={()=>handleOpen(item.path)} index={item.path}>
                                    <el-icon>{handleIcon(item.meta?.icon??'')}</el-icon>

                                    {
                                        item.name
                                    }
                                </el-menu-item>
                            </>
                        )
                    }
                })
            }
            return () => (
                <>
                    <el-menu
                        class="el-menu-vertical-demo"
                        onClose={handleClose}
                        ref={refData.value}
                        style={{height:height+'px',}}
                    >
                        {handleMenuDom()}
                    </el-menu>
                </>
            )
        },
    })
</script>
<style lang="scss" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 250px;
        min-height: 400px;
    }
</style>