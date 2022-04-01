<template>
    <div>
        <h1>333333333333333</h1>
        <el-button type="success" @click="handleCancel">关闭</el-button>
    </div>
</template>

<script>
    export default {
        props:{
            props:{
                type:Object,
                default:()=>{}
            }
        },
        mounted(){
            console.log(this.props,'344')
        },
        data() {
            return {
                abc: "123",
            };
        },
        methods:{
            handleCancel(){
                this.$emit('doCancel',{abc:123})
            },
        }
    };
</script>

<style>
</style>