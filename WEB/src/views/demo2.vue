<template>
    <div>
        <h1>333333333333333</h1>
        <el-button type="success" @click="handleCancel">关闭</el-button>
        <el-button type="success" @click="doChange">点击</el-button>
        <Demo3 :arr="arr"></Demo3>
    </div>
</template>

<script>
import Demo3 from './demo3.vue'
    export default {
        components:{
            Demo3
        },
        props:{
            props:{
                type:Object,
                default:()=>{}
            }
        },
        mounted(){
            // console.log(this.$route.matched);
            // this.$route.matched.forEach(item => {
            //     console.log(item,87772)
            //     item.meta.isCheck = true;
            // });
            // console.log(this.$route,9888)

            this.$router.options.routes[1].meta = {
                isCheck:true
            };

            console.log(this.$router.options);
            // console.log(this.props,'344')
        },
        data() {
            return {
                abc: "123",
                arr:[1,23,4,5,6]
            };
        },
        methods:{
            doChange(){
                this.arr = [9,7,9,5,67,334]
            },
            handleCancel(){
                this.$emit('doCancel',{abc:123})
            },
        }
    };
</script>

<style>
</style>