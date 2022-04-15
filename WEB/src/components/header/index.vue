<script lang="tsx">
    import { defineComponent, ref, getCurrentInstance } from 'vue';
    import {
        Setting,
        CloseBold,
        Avatar
    } from '@element-plus/icons-vue'
    import { useRouter } from 'vue-router';
    import SlotJsx from './slots.vue'
    export default defineComponent({
        components:{
            SlotJsx,
        },
        setup(props, { slots }){
            let { push } = useRouter();
            const { proxy }:any  = getCurrentInstance();
            const iconName = ref('Setting')
            const Slots = {
                // ↓键名必须要和插槽名相同
                dropdown: () => (
                    <el-dropdown-menu>
                        <el-dropdown-item command="psw" icon={Avatar}>修改密码</el-dropdown-item>
                        <el-dropdown-item command="layout" icon={CloseBold}>退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                )
            }
            const A = (props:any, { slots }:any) => (
                <>
                    <div>{ slots.dropdown?.() }</div>
                </>
            );
            const handleCommand = (command: string | number | object) => {
                if(command == 'psw'){
                    proxy.$message.success('修改密码')
                } else if(command == 'layout') {
                    push('/login');
                    localStorage.removeItem('token');
                }
            }
            return () => (
                <>
                    <div class="header-content">
                        <div class="header-title">
                            后台管理系统
                        </div>
                        <div class="header-right">
                            <el-dropdown onCommand={handleCommand} v-slots={Slots}>
                                <el-icon size={20}>
                                    <Setting></Setting>
                                </el-icon>
                            </el-dropdown>
                        </div>
                    </div>
                </>
            )
        },
        mounted(){
        }
    })
</script>
<style lang="scss" scoped>
    .header-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .header-title{
            font-size: 24px;
        }
        .header-right{
            display: flex;
            align-items: center;
        }
    }
</style>