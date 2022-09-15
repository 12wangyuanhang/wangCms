<template>
    <div>
        <el-row class="mb-4">
            <el-button>Default</el-button>
            <el-button @click="handleDialog" type="primary">Primary</el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
            <el-button>中文</el-button>
        </el-row>
    </div>
</template>

<script>
    import Demo2 from './demo2.vue'
    export default {
        name: "button",
        components:{
            Demo2
        },
        computed:{

        },
        mounted(){
            console.log(this.$router.options);
        },
        methods:{
            async handleDialog(){
                let res = await this.$dialog({
                    title:'弹窗',
                    components:Demo2,
                    props:{
                        abc:'1234',
                    }
                })
                console.log(res,345)
            },
        },
    };
</script>

<style>
</style>