<script lang="tsx">
    import { defineComponent, ref } from 'vue';
     import {
        Location,
        Document,
        Menu as IconMenu,
        Setting,
    } from '@element-plus/icons-vue';
    import { useRouter } from 'vue-router';
    export default defineComponent({
        components:{
            Location,
            Document,
            IconMenu,
            Setting,
        },
        setup(){
            const router = useRouter();
            const height = document.documentElement.clientHeight - 60;
            console.log(height,3445)
            const isCollapse = ref(false)
            const handleOpen = (key: string) => {
                // console.log(key,3444555)
                // console.log(123)
                // return
                router.push(key);
            }
            const handleClose = (key: string, keyPath: string[]) => {
                console.log(key, keyPath)
            }
            const titleSlot1 = {
                title:()=>(
                    <>
                        <el-icon><Location /></el-icon>
                        <span>Navigator One</span>
                    </>
                )
            }
            const titleSlot2 = {
                title:()=>(
                    <>
                        <span>Group One</span>
                    </>
                )
            }
            const titleSlot3 = {
                title:()=>(
                    <>
                        <span>item four</span>
                    </>
                )
            }
            const titleSlot4 = {
                title:()=>(
                    <>
                        <span>Navigator Two</span>
                    </>
                )
            }
            const titleSlot5 = {
                title:()=>(
                    <>
                        <span>Navigator Three</span>
                    </>
                )
            }
            const titleSlot6 = {
                title:()=>(
                    <>
                        <span>Navigator Four</span>
                    </>
                )
            }
            return () => (
                <>
                    <el-menu
                        class="el-menu-vertical-demo"
                        onClose={handleClose}
                        style={{height:height+'px',}}
                    >
                        <el-sub-menu   index="1" v-slots={titleSlot1}>
                            <el-menu-item-group  v-slots={titleSlot2}>
                                <el-menu-item index="1-1">item one</el-menu-item>
                                <el-menu-item index="1-2">item two</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group onClick={handleOpen} title="Group Two">
                                <el-menu-item index="1-3">item three</el-menu-item>
                            </el-menu-item-group>
                            <el-sub-menu index="1-4" v-slots={titleSlot3}>
                                <el-menu-item index="1-4-1">item one</el-menu-item>
                            </el-sub-menu>
                        </el-sub-menu>
                        <el-menu-item onClick={()=>handleOpen('/home/test')} index="test" v-slots={titleSlot4}>
                            <el-icon><icon-menu /></el-icon>
                        </el-menu-item>
                        <el-menu-item index="3" disabled v-slots={titleSlot5}>
                            <el-icon><Document /></el-icon>
                        </el-menu-item>
                        <el-menu-item index="4" v-slots={titleSlot6}>
                            <el-icon><Setting /></el-icon>
                        </el-menu-item>
                    </el-menu>
                </>
            )
        }
    })
</script>
<style lang="scss" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 250px;
        min-height: 400px;
    }
</style>