<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-container>
                <el-aside width="250px">
                    <LeftMenu />
                </el-aside>
                <el-main :style="{height:height+'px'}">
                    <div class="main-content-home">
                        <!-- 1234 -->
                        <router-view></router-view>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Header from '@/components/header/index.vue';
    import LeftMenu from '@/components/leftMenu/index.vue';
    import cyData from '../utils/getDatabyName'
    import tools from '../utils/tools'
    export default {
        components: {
            Header,
            LeftMenu
        },
        data() {
            return {
                height:document.documentElement.clientHeight - 60,
                iconName:'Setting',
                // fullscreenLoading:false,
            }
        },
        mounted(){
            // console.log(tools)
            // tools.openFullScreen()

            // // this.fullscreenLoading = true;
            // setTimeout(()=>{
            //     // this.fullscreenLoading = false;
            //     tools.closeLoading()
            // },2000)
            console.log(cyData(), 900000)
        },
        methods:{
            
        }
    }
</script>

<style>
    .main-content-home{
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
    .el-main {
        text-align: left!important;
        line-height: 1!important;
    }
    .el-container {
        margin: 0!important;
    }
    .common-layout .el-header,
    .common-layout .el-footer {
        background-color: #b3c0d1;
        color: var(--el-text-color-primary);
        text-align: center;
        line-height: 60px;
    }

    .common-layout .el-footer {
        line-height: 60px;
    }

    .common-layout .el-aside {
        background-color: #d3dce6;
        color: var(--el-text-color-primary);
        text-align: center;
        line-height: 200px;
    }

    .common-layout .el-main {
        background-color: #e9eef3;
        color: var(--el-text-color-primary);
        text-align: center;
        line-height: 160px;
    }

    .common-layout>.el-container {
        margin-bottom: 40px;
    }

    .common-layout .el-container:nth-child(5) .el-aside,
    .common-layout .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .common-layout .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>